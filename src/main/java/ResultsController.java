import Area.HitChecker;
import Area.HitData;
import Area.InputData;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;

public class ResultsController {
    private EntityManager entityManager;
    private List<HitData> hitsData;

    public ResultsController() {
        hitsData = new ArrayList<>();
        EntityManagerFactory hitDataUnit = Persistence.createEntityManagerFactory("HitDataUnit");
        entityManager = hitDataUnit.createEntityManager();
    }

    public String AddResult(InputData inputData) {
        HitChecker hitChecker = new HitChecker();
        HitData data = hitChecker.checkHit(inputData);

        hitsData.add(data);
        entityManager.getTransaction().begin();
        entityManager.persist(data);
        entityManager.getTransaction().commit();

        return "mainPage";
    }

    public List<HitData> getHitsData() {
        return hitsData;
    }
}
