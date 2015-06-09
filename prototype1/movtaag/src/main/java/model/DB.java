package model;
import cat.quickdb.db.AdminBase;
public class DB{
    public static AdminBase admin;
    public static AdminBase getInstance(){
        if(admin == null){
            admin = AdminBase.initialize(AdminBase.DATABASE.SQLite, "localhost",
        "3306", "exampleQuickDB", "root", "");
        }
        return admin;
    }
}
