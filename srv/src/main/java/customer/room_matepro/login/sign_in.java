package customer.room_matepro.login;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Id;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.SqlResultSetMapping;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@Getter
@Setter
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)

@SqlResultSetMapping(
        name = "sign_inMapping",
        classes = @ConstructorResult(
            targetClass =sign_in.class,
            columns = {
               @ColumnResult(name = "user_id", type = Long.class),
               @ColumnResult(name = "full_name", type = String.class),
                @ColumnResult(name = "email", type = String.class),
                @ColumnResult(name = "phone_number", type = String.class),
                @ColumnResult(name = "password_pwd", type = String.class),
                @ColumnResult(name = "role_user", type = String.class)

            }
        )

)
public class sign_in 
{
    @Id
     @Column(name = "user_id")
    private Long userId;
    @Column(name = "full_name")
    private String fullname;
    @Column(name="email")
    private String email;
    @Column(name="phone_number")
    private String phonenumber;
    @Column(name="password_pwd")
    private String passwordPwd;
    @Column(name="role_user")
    private String roleUser;

       public sign_in(Long userId, String fullname, String email, String phonenumber, String passwordPwd, String roleUser) {
        this.userId = userId;
        this.fullname = fullname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.passwordPwd = passwordPwd;
        this.roleUser = roleUser;
    }
} 