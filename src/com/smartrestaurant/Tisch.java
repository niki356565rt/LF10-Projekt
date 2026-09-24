package com.smartrestaurant;

/**
 * Repräsentiert einen Tisch in der Gaststätte.
 */
public class Tisch {
    private int id;
    private int tischnummer;
    private int kapazitaet;
    private String status; // "frei" oder "belegt"

    public Tisch(int id, int tischnummer, int kapazitaet, String status) {
        this.id = id;
        this.tischnummer = tischnummer;
        this.kapazitaet = kapazitaet;
        this.status = status;
    }

    public Tisch(int tischnummer, int kapazitaet, String status) {
        this(0, tischnummer, kapazitaet, status);
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getTischnummer() { return tischnummer; }
    public void setTischnummer(int tischnummer) { this.tischnummer = tischnummer; }

    public int getKapazitaet() { return kapazitaet; }
    public void setKapazitaet(int kapazitaet) { this.kapazitaet = kapazitaet; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "Tisch " + tischnummer + " (" + kapazitaet + " Pers., " + status + ")";
    }
}
