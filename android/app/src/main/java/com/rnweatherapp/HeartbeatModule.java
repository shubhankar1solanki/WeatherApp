package com.rnweatherapp;

import android.content.Intent;
import android.graphics.Bitmap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.squareup.picasso.Picasso;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.annotation.Nonnull;

public class HeartbeatModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "Heartbeat";
    private static ReactApplicationContext reactContext;

    public HeartbeatModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService(String url, String body) {
        Intent intent = new Intent(this.reactContext, HeartbeartService.class);
        Bitmap bmp = null;
        try {
            bmp = Picasso.get().load(url).get();
        } catch (IOException e) {
            e.printStackTrace();
        }

        ByteArrayOutputStream bStream = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.PNG, 100, bStream);
        byte[] byteArray = bStream.toByteArray();


//        intent.putExtra("name",intent.getExtras().getString("name"));
        intent.putExtra("url", url);
        intent.putExtra("bmp", byteArray);
        intent.putExtra("body", body);
        this.reactContext.startService(intent);
    }

    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, HeartbeartService.class));
    }
}
