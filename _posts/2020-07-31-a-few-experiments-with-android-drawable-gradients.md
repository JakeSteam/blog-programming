---
id: 2775
title: 'A few experiments with Android drawable gradients'
date: '2020-07-31T15:20:20+01:00'
permalink: /a-few-experiments-with-android-drawable-gradients/
image: /wp-content/uploads/2020/07/wHxeCa2.png
categories:
    - 'Android Dev'
tags:
    - Design
    - Drawable
    - Gradient
    - XML
---

After recently struggling to make a small modification to a simple translucent overlay, I decided to experiment with gradients in Android drawables. After a few hours, I discovered a few new possibilities! Drawable gradients seem to be rarely used despite their simple syntax, with people preferring to use SVGs or static images.

I've included a few example outputs in this post, hopefully these help those struggling to create a gradient. I also recommend taking a look at [AngryTools' gradient generator](https://angrytools.com/gradient/) (Android tab), to easily generate the XML for simpler gradients automatically.

This post is also [available as a GitHub repo](https://github.com/JakeSteam/android-gradient-playground).

<table>
    <tr><th>Notes</th><th>Gradient</th><th>XML</th></tr>
    <tr>
        <td><strong>Simple linear gradient</strong><br>A really simple gradient to start, our first type is "linear". All we have is a <code>startColor</code> of white and an <code>endColor</code> of black, resulting in the nice smooth transition shown.</td>
        <td><a href="/assets/images/2024/gradient-simplelinear.png"><img src="/assets/images/2024/gradient-simplelinear.png" /></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;shape xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
   &lt;gradient android:startColor=&quot;@android:color/white&quot; android:endColor=&quot;@android:color/black&quot; /&gt;
&lt;/shape&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Centre offsetting</strong> <br>Whilst this gradient might look very similar to the previous, there's a secret inside: <code>centerY</code>.  Setting a centre colour (<code>holo_blue_dark</code> in this case) allows for slightly more complex gradients, but the interesting bit happens when you redefine where the centre is. <code>centerX</code> and <code>centerY</code> will both be used extensively throughout this post, and work by redefining where the centre colour should appear. For example, a value of <code>20%</code> or <code>0.2</code> will ensure your <code>centerColor</code> appears 20% down the drawable vertically.</td>
        <td><a href="/assets/images/2024/gradient-centreoffsetting.png"><img src="/assets/images/2024/gradient-centreoffsetting.png"></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;shape xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
   &lt;gradient android:startColor=&quot;@android:color/white&quot; android:centerColor=&quot;@android:color/holo_blue_dark&quot; android:endColor=&quot;@android:color/black&quot; android:centerY=&quot;0.2&quot; /&gt;
&lt;/shape&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Overlapping layers</strong><br>Building up on our previous gradient, adding an extra layer (via <code>layer-list</code>) drastically increases the complexity of the output. <code>layer-list</code> simply lets you overlap multiple gradients without making new <code>ImageView</code>s or drawables.  In this case, a transparent -&gt; black gradient has been added on top of our existing white -&gt; blue -&gt; black gradient, at an <code>angle</code> (essentially rotation) of 180.</td>
        <td><a href="/assets/images/2024/gradient-overlappinglayers.png"><img src="/assets/images/2024/gradient-overlappinglayers.png"></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;layer-list xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:startColor=&quot;@android:color/white&quot; android:centerColor=&quot;@android:color/holo_blue_dark&quot; android:endColor=&quot;@android:color/black&quot; android:centerY=&quot;0.2&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:startColor=&quot;@android:color/black&quot; android:endColor=&quot;@android:color/transparent&quot; android:angle=&quot;180&quot;/&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
&lt;/layer-list&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Overlapping layers at the same angle</strong> <br>Just as the last gradient overlapped gradients at right angles, you can also overlap them without rotating. If a layer has a transparent <code>startColor</code> and <code>endColor</code>, but a non-transparent <code>centerColor</code>, it will appear as a horizontal strip of colour. Offsetting this strip using <code>centerY</code>, then repeating the process, allows a full rainbow of colours to be created. Note that this gradient also has a base white layer, to help the gradient be visible.</td>
        <td><a href="/assets/images/2024/gradient-overlappinglayerssameangle.png"><img src="/assets/images/2024/gradient-overlappinglayerssameangle.png"></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;layer-list xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;solid android:color=&quot;@android:color/white&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:startColor=&quot;@android:color/holo_purple&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot; android:centerY=&quot;0.4&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:startColor=&quot;@android:color/transparent&quot; android:centerColor=&quot;@android:color/holo_orange_light&quot; android:endColor=&quot;@android:color/transparent&quot; android:centerY=&quot;0.4&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:startColor=&quot;@android:color/transparent&quot; android:centerColor=&quot;@android:color/holo_blue_light&quot; android:endColor=&quot;@android:color/transparent&quot; android:centerY=&quot;0.7&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:startColor=&quot;@android:color/transparent&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/holo_green_dark&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
&lt;/layer-list&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Radial gradients</strong> <br>So far we've only seen linear gradients, now we'll use radial gradients. The easiest way of thinking about them is as a "point" of colour, radiating out. <code>centerX</code> and <code>centerY</code> can be used to move this point anywhere on the canvas, in this case 10% from the left and 10% from the top.  Again, the <code>startColor</code>, <code>centerColor</code>, and <code>endColor</code> are used to set the colour, along with <code>gradientRadius</code> being used to set the overall size of the gradient.</td>
        <td><a href="/assets/images/2024/gradient-radialgradients.png"><img src="/assets/images/2024/gradient-radialgradients.png"></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;shape xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot; android:shape=&quot;rectangle&quot;&gt;
   &lt;gradient android:type=&quot;radial&quot; android:gradientRadius=&quot;100%&quot; android:startColor=&quot;@android:color/black&quot; android:centerColor=&quot;@android:color/holo_blue_light&quot; android:centerX=&quot;0.1&quot; android:centerY=&quot;0.1&quot; android:endColor=&quot;@android:color/white&quot; /&gt;
&lt;/shape&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Floating blobs</strong> <br>Combining multiple radial gradients using the same overlapping technique as our "vertical rainbow" before, we can end up with this collection of floating blobs. This effect is often hunted for by people looking to create an Instagram style logo, and is very easy to achieve. So long as you know your colours, it's just a matter of adjusting the radius, x position, and y position until each blob is in the correct place. I used this to <a href="https://stackoverflow.com/a/63162666/608312">answer a question on StackOverflow</a>, and the OP raised a reasonable counterpoint. If you need a particularly complex gradient, you could just try exporting an SVG / PNG. However, with vector graphics sometimes gradients aren't translated properly, and a PNG will either be too large, or may not scale perfectly to the user's screen. If possible, creating an image as a gradient drawable will ensure it is perfect!</td>
        <td><a href="/assets/images/2024/gradient-floatingblobs.png"><img src="/assets/images/2024/gradient-floatingblobs.png"></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;layer-list xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
   &lt;item&gt;
      &lt;shape android:layout_height=&quot;wrap_content&quot;&gt;
         &lt;solid android:color=&quot;@android:color/black&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;radial&quot; android:gradientRadius=&quot;100%&quot; android:startColor=&quot;@android:color/holo_purple&quot; android:centerX=&quot;0.1&quot; android:centerY=&quot;0.1&quot; android:endColor=&quot;@android:color/transparent&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;radial&quot; android:gradientRadius=&quot;70%&quot; android:startColor=&quot;@android:color/holo_orange_light&quot; android:centerX=&quot;0.8&quot; android:centerY=&quot;0.5&quot; android:endColor=&quot;@android:color/transparent&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;radial&quot; android:gradientRadius=&quot;40%&quot; android:startColor=&quot;@android:color/holo_blue_light&quot; android:centerX=&quot;0.8&quot; android:centerY=&quot;0.1&quot; android:endColor=&quot;@android:color/transparent&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;radial&quot; android:gradientRadius=&quot;70%&quot; android:startColor=&quot;@android:color/holo_green_light&quot; android:centerX=&quot;0.2&quot; android:centerY=&quot;0.8&quot; android:endColor=&quot;@android:color/transparent&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;radial&quot; android:gradientRadius=&quot;50%&quot; android:startColor=&quot;@android:color/holo_red_light&quot; android:centerX=&quot;0.7&quot; android:centerY=&quot;0.85&quot; android:endColor=&quot;@android:color/transparent&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
&lt;/layer-list&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Sweep gradient</strong> <br>The final type of gradients are sweep. These don't seem to make sense at first glance, I find the easiest way of thinking of them is as a "cone" shaped linear gradient, viewed from above. However you interpret them, they still use all the attributes we've picked up in previous gradients.</td>
        <td><a href="/assets/images/2024/gradient-sweepgradient.png"><img src="/assets/images/2024/gradient-sweepgradient.png" alt=""></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;shape xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  android:shape=&quot;rectangle&quot;&gt;  &lt;gradientandroid:startColor=&quot;@android:color/holo_blue_dark&quot;android:endColor=&quot;@android:color/holo_orange_dark&quot;android:type=&quot;sweep&quot; /&gt; &lt;/shape&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Sweep offsets</strong> <br>Whilst not quite as pretty as the "rainbow" or "floating blobs" seen with other gradients, offsetting radial drawables creates a pretty odd effect.  I'm not <strong>entirely</strong> sure I can think of a valid use case for this, but presumably someone needs a gradient that looks like an open doorway!</td>
        <td><a href="/assets/images/2024/gradient-sweepoffsets.png"><img src="/assets/images/2024/gradient-sweepoffsets.png" alt=""></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;layer-list xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;solid android:color=&quot;@android:color/black&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.3&quot; android:centerY=&quot;0.1&quot; android:startColor=&quot;@android:color/holo_red_dark&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.8&quot; android:centerY=&quot;0.3&quot; android:startColor=&quot;@android:color/holo_blue_dark&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.1&quot; android:centerY=&quot;0.5&quot; android:startColor=&quot;@android:color/holo_green_dark&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.6&quot; android:centerY=&quot;0.7&quot; android:startColor=&quot;@android:color/holo_orange_dark&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.1&quot; android:centerY=&quot;0.9&quot; android:startColor=&quot;@android:color/holo_purple&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
&lt;/layer-list&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Sweep rotations</strong> <br>Just like the last gradient, I can't think of a valid use case for this! Wrapping each <code>shape</code> inside a <code>rotate</code> allows rotating it at any angle, although interestingly it still retains the "edges" from the original shape. I suspect this is solvable by rotating the gradient not the shape, which might produce a more aesthetically pleasing output.</td>
        <td><a href="/assets/images/2024/gradient-sweeprotations.png"><img src="/assets/images/2024/gradient-sweeprotations.png" alt=""></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;layer-list xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
   &lt;item&gt;
      &lt;shape&gt;
         &lt;solid android:color=&quot;@android:color/black&quot; /&gt;
      &lt;/shape&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;rotate android:fromDegrees=&quot;66&quot; android:toDegrees=&quot;0&quot; android:pivotY=&quot;50%&quot; android:pivotX=&quot;50%&quot;&gt;
         &lt;shape&gt;
            &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.3&quot; android:centerY=&quot;0.5&quot; android:startColor=&quot;@android:color/holo_red_dark&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
         &lt;/shape&gt;
      &lt;/rotate&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;rotate android:fromDegrees=&quot;290&quot; android:toDegrees=&quot;0&quot; android:pivotY=&quot;40%&quot; android:pivotX=&quot;30%&quot;&gt;
         &lt;shape&gt;
            &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.8&quot; android:centerY=&quot;0.3&quot; android:startColor=&quot;@android:color/holo_blue_dark&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
         &lt;/shape&gt;
      &lt;/rotate&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;rotate android:fromDegrees=&quot;18&quot; android:toDegrees=&quot;0&quot; android:pivotY=&quot;40%&quot; android:pivotX=&quot;30%&quot;&gt;
         &lt;shape&gt;
            &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.1&quot; android:centerY=&quot;0.5&quot; android:startColor=&quot;@android:color/holo_green_dark&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
         &lt;/shape&gt;
      &lt;/rotate&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;rotate android:fromDegrees=&quot;280&quot; android:toDegrees=&quot;0&quot; android:pivotY=&quot;50%&quot; android:pivotX=&quot;30%&quot;&gt;
         &lt;shape&gt;
            &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.6&quot; android:centerY=&quot;0.7&quot; android:startColor=&quot;@android:color/holo_orange_dark&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
         &lt;/shape&gt;
      &lt;/rotate&gt;
   &lt;/item&gt;
   &lt;item&gt;
      &lt;rotate android:fromDegrees=&quot;0&quot; android:toDegrees=&quot;0&quot; android:pivotY=&quot;50%&quot; android:pivotX=&quot;30%&quot;&gt;
         &lt;shape&gt;
            &lt;gradient android:type=&quot;sweep&quot; android:centerX=&quot;0.0&quot; android:centerY=&quot;0.0&quot; android:startColor=&quot;@android:color/holo_purple&quot; android:centerColor=&quot;@android:color/transparent&quot; android:endColor=&quot;@android:color/transparent&quot;/&gt;
         &lt;/shape&gt;
      &lt;/rotate&gt;
   &lt;/item&gt;
&lt;/layer-list&gt;</code></pre></td>
    </tr>
    <tr>
        <td><strong>Sweep split</strong> <br>Finally, one little curiosity about sweep gradients. By offsetting the <code>centerX</code> very far to the left, you'll end up with a top and bottom that are solid colours. This creates an interesting effect, although it could obviously be done much easier by using <code>solid</code>! If you need a similar gradient, I recommend reading the <a href="https://stackoverflow.com/questions/4381033/multi-gradient-shapes">answers on this StackOverflow question</a> for simpler ways of achieving it.</td>
        <td><a href="/assets/images/2024/gradient-sweepsplit.png"><img src="/assets/images/2024/gradient-sweepsplit.png" alt=""></a></td>
        <td><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt; 
&lt;shape xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;  android:shape=&quot;rectangle&quot;&gt;
   &lt;gradient android:startColor=&quot;@android:color/red&quot; android:endColor=&quot;@android:color/holo_orange_dark&quot; android:centerX=&quot;-99&quot; android:type=&quot;sweep&quot; /&gt;
   &lt;corners android:radius=&quot;20dp&quot; /&gt;
&lt;/shape&gt;</code></pre></td>
    </tr> 
</table>
