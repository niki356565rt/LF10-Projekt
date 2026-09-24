package com.smartrestaurant;

/**
 * Repräsentiert eine Bestellung im Smart Restaurant System.
 */
public class Bestellung {
    private int id;
    private int tischId;
    private int tischNummer;
    private int mitarbeiterId;
    private String mitarbeiterName;
    private String status; // "aufgegeben", "in Bearbeitung", "fertig", "serviert", "bezahlt"
    private String erstelltAm;
    private double gesamtpreis;

    public Bestellung(int id, int tischId, int tischNummer, int mitarbeiterId, String mitarbeiterName, String status, String erstelltAm, double gesamtpreis) {
        this.id = id;
        this.tischId = tischId;
        this.tischNummer = tischNummer;
        this.mitarbeiterId = mitarbeiterId;
        this.mitarbeiterName = mitarbeiterName;
        this.status = status;
        this.erstelltAm = erstelltAm;
        this.gesamtpreis = gesamtpreis;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getTischId() { return tischId; }
    public void setTischId(int tischId) { this.tischId = tischId; }

    public int getTischNummer() { return tischNummer; }
    public void setTischNummer(int tischNummer) { this.tischNummer = tischNummer; }

    public int getMitarbeiterId() { return mitarbeiterId; }
    public void setMitarbeiterId(int mitarbeiterId) { this.mitarbeiterId = mitarbeiterId; }

    public String getMitarbeiterName() { return mitarbeiterName; }
    public void setMitarbeiterName(String mitarbeiterName) { this.mitarbeiterName = mitarbeiterName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(String erstelltAm) { this.erstelltAm = erstelltAm; }

    public double getGesamtpreis() { return gesamtpreis; }
    public void setGesamtpreis(double gesamtpreis) { this.gesamtpreis = gesamtpreis; }
}
