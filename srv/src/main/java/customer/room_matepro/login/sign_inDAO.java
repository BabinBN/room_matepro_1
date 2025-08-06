package customer.room_matepro.login;


import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.google.gson.Gson;



import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
@Transactional
@Repository

public class sign_inDAO {
@PersistenceContext

    private EntityManager entityManager;
    
    public sign_in CreateSignIn(sign_inEntity SignIn) {
        try {
            String reqPayload = new Gson().toJson(new sign_inEntity[] { SignIn });
            StoredProcedureQuery query = entityManager
            .createStoredProcedureQuery("ADD_EDIT_USER","sign_inMapping");
            query.registerStoredProcedureParameter("IN_PARAM", String.class, ParameterMode.IN);
            query.registerStoredProcedureParameter("EX_MESSAGE", String.class, ParameterMode.OUT);
            query.setParameter("IN_PARAM", reqPayload);
            query.execute();
        //        boolean hasResultSet = query.execute();
         //String exMessage = (String) query.getOutputParameterValue("EX_MESSAGE");
        // if (hasResultSet) {
        //     @SuppressWarnings("unchecked")
        //     List<sign_in> resultList = query.getResultList();
        //     return resultList.isEmpty() ? null : resultList.get(0);
        // }
           // @SuppressWarnings("unchecked")
        sign_in resultList =(sign_in) query.getSingleResult();

        return resultList;
        } catch (Exception e) {
            return null;
        }
    }
}
