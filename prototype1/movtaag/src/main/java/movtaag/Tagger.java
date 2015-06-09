package movtaag;
 
import com.google.gson.Gson;
import static spark.Spark.*;
 
import spark.*;
 
import java.io.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.regex.PatternSyntaxException;
import model.DB;
import model.Tag;
 
public class Tagger {
 
  private static final Map<String, Object> settings = new HashMap<String, Object>();
 
  public static String parse(String pattern, String text, Map<String, Object> locals) {
    Matcher regexp = Pattern.compile(pattern).matcher(text);
    while (regexp.find()) {
      text = regexp.replaceFirst(locals.get(regexp.group(1)).toString());
    }
    return text;
  }
 
  public static String parseFile(String file, String pattern, Map<String, Object> locals) {
    StringBuffer content = new StringBuffer("");
    try {
      BufferedReader buffer = new BufferedReader(new FileReader(file));
      String line = null;
 
      while ((line = buffer.readLine()) != null) {
        content.append(parse(pattern, line, locals) + "\n");
      }
 
      buffer.close();
    }
    catch (Exception exception) {
      System.out.printf("ERROR: %s\n", exception.getMessage());
    }
    finally {
      return content.toString();
    }
  }
 
  public static String render(String file, Map<String, Object> locals) {
    return layout(file, parseFile(file, "\\$\\{(\\w.*?)\\}", locals));
  }
 
  public static String layout(String file, String content) {
    HashMap<String, Object> layout = new HashMap<String, Object>();
    layout.put("content", content);
    return parseFile(file, "@\\{(content)\\}", layout);
  }
 
  public static void set(String key, Object value) {
    settings.put(key, (String) value);
  }
 
  public static Object settings(String key) {
    return settings.get(key);
  }
 
  public static void main(String[] args) {
      String movie = "http://www.youtube.com/embed/AWxy9C5svFU";
    get("/", (Request request, Response response) -> {
        
        return render("public/index.html", settings);
    });
     get("/js", (Request request, Response response) -> {

        System.out.println(request.params());
        System.out.println(request.attributes());
        Gson gson = new Gson();
        List<String> list = new ArrayList<>();
         List<Tag> ls = DB.getInstance().obtainAll(new Tag(), "tag.description = '"+request.queryParams("search")+"'");
         for(Tag t : ls){
             list.add("http://www.youtube.com/embed/AWxy9C5svFU/?start="+t.getStart()+"&end="+t.getEnd()+"&version=3");
         }
        return gson.toJson(list).toString();
        
    });
    get("/as", (Request request, Response response) -> {
        System.out.println(request.queryParams());
        Tag tag = new Tag();
        tag.setMovie("http://www.youtube.com/embed/AWxy9C5svFU");
        tag.setStart(request.queryParams("start"));
        tag.setEnd(request.queryParams("end"));
        tag.setDescription(request.queryParams("tagtext"));
        DB.getInstance().save(tag);
        return render("public/index.html", settings);
    });
  }
 
}