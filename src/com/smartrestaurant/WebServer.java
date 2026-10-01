package com.smartrestaurant;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import java.util.concurrent.Executors;

/**
 * Leichtgewichtiger eingebetteter Java HTTP Server (ohne externe Frameworks).
 * Stellt das dedizierte Web-Frontend unter http://localhost:8080 bereit.
 */
public class WebServer {
    private static final int PORT = 8080;

    public static void startServer() {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

            // Statische Frontend-Dateien bereitstellen (web/index.html)
            server.createContext("/", new HttpHandler() {
                @Override
                public void handle(HttpExchange exchange) throws IOException {
                    File file = new File("web/index.html");
                    if (!file.exists()) {
                        String notFound = "Frontend Datei web/index.html nicht gefunden.";
                        exchange.sendResponseHeaders(404, notFound.getBytes().length);
                        OutputStream os = exchange.getResponseBody();
                        os.write(notFound.getBytes());
                        os.close();
                        return;
                    }

                    exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                    exchange.sendResponseHeaders(200, file.length());

                    OutputStream os = exchange.getResponseBody();
                    FileInputStream fs = new FileInputStream(file);
                    byte[] buffer = new byte[1024];
                    int count;
                    while ((count = fs.read(buffer)) >= 0) {
                        os.write(buffer, 0, count);
                    }
                    fs.close();
                    os.close();
                }
            });

            server.setExecutor(Executors.newCachedThreadPool()); // Multi-threaded Executor
            server.start();
            System.out.println("Web-Frontend gestartet unter: http://localhost:" + PORT);
        } catch (IOException e) {
            System.err.println("Webserver konnte nicht gestartet werden: " + e.getMessage());
        }
    }
}
