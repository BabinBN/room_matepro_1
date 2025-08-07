package customer.room_matepro.login;


import jakarta.persistence.*;
import lombok.*;
@Data
@Entity
@Getter
@Setter
@NoArgsConstructor


public class sign_inEntity {

    @Id
    private Long user_id;
    private String full_name;
    private String email;
    private String phone_number;
    private String password_pwd;
    private String role_user;
     private String created_at;
    private String updated_at;
    private String confirm_pwd;

    // // Constructor required for @ConstructorResult
    public sign_inEntity(Long userId, String fullname, String email, String phonenumber, String passwordPwd, String roleUser,String createdAt, String updatedAt, String confirmPwd) {
        this.user_id = userId;
        this.full_name = fullname;
        this.email = email;
        this.phone_number = phonenumber;
        this.password_pwd = passwordPwd;
        this.role_user = roleUser;
        this.created_at = createdAt; 
        this.updated_at = updatedAt; 
        this.confirm_pwd = confirmPwd;
    }
}
