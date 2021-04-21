package com.rnweatherapp;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.os.Build;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import java.io.IOException;
import java.net.URL;

public class HeartbeartService extends Service {

    private static final int SERVICE_NOTIFICATION_ID = 12345;
    private static final String CHANNEL_ID = "HEARTBEAT";

    private Handler handler = new Handler();
    private Runnable runnableCode = new Runnable() {
        @Override
        public void run() {
            Context context = getApplicationContext();
            Intent myIntent = new Intent(context, HeartbeatEventService.class);
            context.startService(myIntent);
            HeadlessJsTaskService.acquireWakeLockNow(context);
            handler.postDelayed(this, 2000);
        }
    };
    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "HEARTBEAT", importance);
            channel.setDescription("CHANEL DESCRIPTION");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        this.handler.removeCallbacks(this.runnableCode);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        this.handler.post(this.runnableCode);
        final Bitmap[] image = {null};
        final Bitmap[] bmp = {null};
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        String url=intent.getExtras().getString("url","");
       String body=intent.getExtras().getString("body","");
//       Bitmap bmp = (Bitmap) intent.getExtras().get("bmp");
//        Bitmap bmp = (Bitmap) intent.getExtras("bmp");
//        Bitmap bmp = BitmapFactory.decodeByteArray( intent.getByteArrayExtra("bmp"),0,intent.getByteArrayExtra("byteArray").length);

//        Log.e("TAG", "onStartCommand 111:" + bmp);

//        try {
//            bmp = Picasso.get().load(url).get();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }

//        try {
//            URL urls = new URL(url);
//            image= BitmapFactory.decodeStream(urls.openConnection().getInputStream());
//        } catch(IOException e) {
//            System.out.println(e);
//        }


        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Weather App")
                .setContentText(body)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(contentIntent)
                .setOngoing(true);

        Picasso.get().load(url).into(new Target() {
            @Override
            public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
//                Drawable d =getDrawable(R.mipmap.ic_launcher);
//                Bitmap bitmaps = ((BitmapDrawable)d).getBitmap();
//
//                notificationBuilder.setLargeIcon(bitmaps);
                NotificationCompat.BigPictureStyle s = new NotificationCompat.BigPictureStyle().bigLargeIcon(bitmap);
//                s.setSummaryText("notification with image");
                notificationBuilder.setLargeIcon(bitmap);
//                    notificationBuilder.setLargeIcon(s.);

//                // firing notification here, will beep sound once,
//                NotificationManagerCompat mNotificationManager = NotificationManagerCompat.from(getApplicationContext());
//                Notification notificationCompat = notificationBuilder.build();
//                mNotificationManager.notify(199, notificationCompat);
//                startForeground(SERVICE_NOTIFICATION_ID, notificationCompat);
                NotificationManagerCompat mNotificationManager = NotificationManagerCompat.from(getApplicationContext());
                Notification notificationCompat = notificationBuilder.build();
                startForeground(SERVICE_NOTIFICATION_ID, notificationCompat);
            }

            @Override
            public void onBitmapFailed(Exception e, Drawable errorDrawable) {

            }

            @Override
            public void onPrepareLoad(Drawable placeHolderDrawable) {

            }
        });
//        notificationBuilder.build();

        return START_STICKY;
    }

}
