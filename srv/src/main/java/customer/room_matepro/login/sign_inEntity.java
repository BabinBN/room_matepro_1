package customer.room_matepro.login;


import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Id;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SuppressWarnings("serial")
@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Component
public class sign_inEntity {
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
}
