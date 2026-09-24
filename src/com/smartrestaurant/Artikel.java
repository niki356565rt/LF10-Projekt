package com.smartrestaurant;

/**
 * Repräsentiert einen Speise- oder Getränkeartikel.
 */
public class Artikel {
    private int id;
    private String name;
    private String kategorie;
    private double preis;
    private boolean aktiv;

    public Artikel(int id, String name, String kategorie, double preis, boolean aktiv) {
        this.id = id;
        this.name = name;
        this.kategorie = kategorie;
        this.preis = preis;
        this.aktiv = aktiv;
    }

    public Artikel(String name, String kategorie, double preis) {
        this(0, name, kategorie, preis, true);
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getKategorie() { return kategorie; }
    public void setKategorie(String kategorie) { this.kategorie = kategorie; }

    public double getPreis() { return preis; }
    public void setPreis(double preis) { this.preis = preis; }

    public boolean isAktiv() { return aktiv; }
    public void setAktiv(boolean aktiv) { this.aktiv = aktiv; }

    @Override
    public String toString() {
        return name + " (" + String.format("%.2f €", preis) + ")";
    }
}
