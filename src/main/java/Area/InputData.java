package Area;

public class InputData {
    private double x;
    private double y;
    private double r;

    private static final Integer[] xValues = new Integer[] {-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5};
    private static final Double[] rValues = new Double[] {1d, 1.5d, 2d, 2.5d, 3d};

    public InputData(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public InputData() {
    }


    public double getX() {
        return x;
    }
    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }
    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }
    public void setR(double r) {
        this.r = r;
    }

    public Integer[] getXValues() {
        return xValues;
    }
    public Double[] getRValues() {
        return rValues;
    }
}
