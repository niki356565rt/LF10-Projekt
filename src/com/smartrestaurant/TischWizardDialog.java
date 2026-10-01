package com.smartrestaurant;

import javax.swing.*;
import java.awt.*;

/**
 * Schritt-für-Schritt Wizard-Dialog für das Anlegen und Bearbeiten von Gaststättentischen.
 */
public class TischWizardDialog extends JDialog {
    private int currentStep = 1;
    private final CardLayout cardLayout = new CardLayout();
    private final JPanel cardsPanel = new JPanel(cardLayout);
    private final JLabel lblStepTitle = new JLabel();

    private final JTextField txtTischnummer = new JTextField();
    private final JTextField txtKapazitaet = new JTextField();
    private final JComboBox<String> cbStatus = new JComboBox<>(new String[]{"frei", "belegt"});

    private final JLabel lblSummaryNr = new JLabel();
    private final JLabel lblSummaryKap = new JLabel();
    private final JLabel lblSummaryStatus = new JLabel();

    private final JButton btnBack = new JButton("‹ Zurück");
    private final JButton btnNext = new JButton("Weiter ›");
    private final JButton btnFinish = new JButton("✓ Fertigstellen");

    private Tisch resultTisch = null;
    private final Tisch editTarget;

    public TischWizardDialog(Frame owner, Tisch editTarget) {
        super(owner, editTarget == null ? "Wizard: Neuen Tisch anlegen" : "Wizard: Tisch bearbeiten", true);
        this.editTarget = editTarget;
        initUI();
    }

    private void initUI() {
        setSize(480, 360);
        setLocationRelativeTo(getOwner());
        setLayout(new BorderLayout(10, 10));

        // Header Step-Indicator
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBackground(new Color(24, 27, 31));
        headerPanel.setBorder(BorderFactory.createEmptyBorder(12, 16, 12, 16));
        lblStepTitle.setFont(new Font("SansSerif", Font.BOLD, 14));
        lblStepTitle.setForeground(Color.WHITE);
        headerPanel.add(lblStepTitle, BorderLayout.CENTER);
        add(headerPanel, BorderLayout.NORTH);

        // Step 1: Tischnummer
        JPanel p1 = new JPanel(new GridLayout(4, 2, 8, 8));
        p1.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p1.add(new JLabel("Tischnummer:"));
        p1.add(txtTischnummer);

        // Step 2: Kapazität & Status
        JPanel p2 = new JPanel(new GridLayout(4, 2, 8, 8));
        p2.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p2.add(new JLabel("Sitzplatz-Kapazität:"));
        p2.add(txtKapazitaet);
        p2.add(new JLabel("Initialer Status:"));
        p2.add(cbStatus);

        // Step 3: Bestätigung
        JPanel p3 = new JPanel(new GridLayout(4, 2, 8, 8));
        p3.setBorder(BorderFactory.createEmptyBorder(15, 20, 15, 20));
        p3.add(new JLabel("Tischnummer:"));
        p3.add(lblSummaryNr);
        p3.add(new JLabel("Kapazität:"));
        p3.add(lblSummaryKap);
        p3.add(new JLabel("Status:"));
        p3.add(lblSummaryStatus);

        cardsPanel.add(p1, "Step1");
        cardsPanel.add(p2, "Step2");
        cardsPanel.add(p3, "Step3");
        add(cardsPanel, BorderLayout.CENTER);

        // Pre-fill if editing
        if (editTarget != null) {
            txtTischnummer.setText(String.valueOf(editTarget.getTischnummer()));
            txtKapazitaet.setText(String.valueOf(editTarget.getKapazitaet()));
            cbStatus.setSelectedItem(editTarget.getStatus());
        }

        // Bottom Navigation Buttons
        JPanel navPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 10, 10));
        JButton btnCancel = new JButton("Abbrechen");

        btnCancel.addActionListener(e -> dispose());
        btnBack.addActionListener(e -> navigate(-1));
        btnNext.addActionListener(e -> navigate(1));
        btnFinish.addActionListener(e -> finish());

        navPanel.add(btnCancel);
        navPanel.add(btnBack);
        navPanel.add(btnNext);
        navPanel.add(btnFinish);
        add(navPanel, BorderLayout.SOUTH);

        updateStepView();
    }

    private void navigate(int delta) {
        if (delta > 0 && currentStep == 1) {
            try {
                int nr = Integer.parseInt(txtTischnummer.getText().trim());
                if (nr <= 0) throw new NumberFormatException();
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Bitte eine gültige Tischnummer eingeben!", "Eingabefehler", JOptionPane.WARNING_MESSAGE);
                return;
            }
        }
        if (delta > 0 && currentStep == 2) {
            try {
                int kap = Integer.parseInt(txtKapazitaet.getText().trim());
                if (kap <= 0) throw new NumberFormatException();
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Bitte eine gültige Kapazität eingeben!", "Eingabefehler", JOptionPane.WARNING_MESSAGE);
                return;
            }
        }
        currentStep += delta;
        updateStepView();
    }

    private void updateStepView() {
        lblStepTitle.setText("Schritt " + currentStep + " von 3: " + getStepName(currentStep));
        cardLayout.show(cardsPanel, "Step" + currentStep);

        btnBack.setEnabled(currentStep > 1);
        btnNext.setVisible(currentStep < 3);
        btnFinish.setVisible(currentStep == 3);

        if (currentStep == 3) {
            lblSummaryNr.setText("Tisch #" + txtTischnummer.getText().trim());
            lblSummaryKap.setText(txtKapazitaet.getText().trim() + " Personen");
            lblSummaryStatus.setText((String) cbStatus.getSelectedItem());
        }
    }

    private String getStepName(int step) {
        switch (step) {
            case 1: return "Tischnummer angeben";
            case 2: return "Kapazität & Status festlegen";
            case 3: return "Eingaben überprüfen & Speichern";
            default: return "";
        }
    }

    private void finish() {
        int id = editTarget != null ? editTarget.getId() : 0;
        int nr = Integer.parseInt(txtTischnummer.getText().trim());
        int kap = Integer.parseInt(txtKapazitaet.getText().trim());
        resultTisch = new Tisch(id, nr, kap, (String) cbStatus.getSelectedItem());
        dispose();
    }

    public Tisch getResult() {
        return resultTisch;
    }
}
