package com.smartrestaurant;

/**
 * Repräsentiert einen Mitarbeiter im Smart Restaurant System.
 */
public class Mitarbeiter {
    private int id;
    private String name;
    private String benutzername;
    private String rolle;
    private boolean aktiv;

    public Mitarbeiter(int id, String name, String benutzername, String rolle, boolean aktiv) {
        this.id = id;
        this.name = name;
        this.benutzername = benutzername;
        this.rolle = rolle;
        this.aktiv = aktiv;
    }

    public Mitarbeiter(String name, String benutzername, String rolle) {
        this(0, name, benutzername, rolle, true);
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBenutzername() { return benutzername; }
    public void setBenutzername(String benutzername) { this.benutzername = benutzername; }

    public String getRolle() { return rolle; }
    public void setRolle(String rolle) { this.rolle = rolle; }

    public boolean isAktiv() { return aktiv; }
    public void setAktiv(boolean aktiv) { this.aktiv = aktiv; }

    @Override
    public String toString() {
        return name + " (" + rolle + ")";
    }
}
