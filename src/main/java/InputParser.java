import Area.InputData;

import javax.servlet.http.HttpServletRequest;

public class InputParser {

    public boolean IsRequestValid(HttpServletRequest req) {
        String strX = req.getParameter("input_x");
        String strY = req.getParameter("input_y");
        String strR = req.getParameter("input_r");

        double x, y, r;
        if (strX == null || strY == null || strR == null) {
            return  false;
        }
        try {
            x = Double.parseDouble(strX);
            y = Double.parseDouble(strY);
            r = Double.parseDouble(strR);
        } catch (Exception e) {
            return false;
        }
        return !(x <= -7) && !(x >= 7) && !(y <= -7) && !(y >= 7) && !(r <= 2) && !(r >= 5);
    }

    public InputData parse(HttpServletRequest req) {
        double x = Double.parseDouble(req.getParameter("input_x"));
        double y = Double.parseDouble(req.getParameter("input_y"));
        double r = Double.parseDouble(req.getParameter("input_r"));
        return new InputData(x, y, r);
    }
}
