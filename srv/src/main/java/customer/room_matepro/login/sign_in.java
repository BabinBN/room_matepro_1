package customer.room_matepro.login;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import lombok.*;

@NoArgsConstructor
@Data
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
                @ColumnResult(name = "role_user", type = String.class),
                @ColumnResult(name = "created_at", type = String.class),
                @ColumnResult(name = "updated_at", type = String.class)

            }
        )

)
public class sign_in 
{
    @Id
    private Long user_id;
    private String full_name;
    private String email;
    private String phone_number;
    private String role_user;
     private String created_at;
    private String updated_at;


       public sign_in(Long userId, String fullname, String email, String phonenumber, String roleUser, String createdAt, String updatedAt) {
        this.user_id = userId;
        this.full_name = fullname;
        this.email = email;
        this.phone_number = phonenumber;
        this.role_user = roleUser;
        this.created_at = createdAt; 
        this.updated_at = updatedAt; 
    }
}

