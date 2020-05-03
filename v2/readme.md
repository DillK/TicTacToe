# **Disclaimer**
>*Disclaimer: **This is not a tutorial**. I am decidedly not an expert. While I do my best to strive for best practices, I do not guarantee them. I'm writing this simply as a means of journaling my own development. I will try to make this document as informative as I can. However, this should not be treated as anything more than the ramblings of a lunatic with a \[D]ill-informed opinion. If other people find this useful though − great!*

<h1>Overview</h1>
This post is most certainly not a tutorial. I would say it has been more of a well documented accounting of my slow descent into madness. Reader be advised - this isn't going to be easy reading to follow. Don't do what I do. Don't be lazy, just do it the right way the first time. It would have saved me a ton of time.

Here we go.
<h1>Not so fast! There is a bug 🐛😥😡💔</h1>
Aww crap. Our Tic Tac Toe game works on all the desktop browsers, but is failing on Firefox for Android.

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-0-498x1024.png" /></center>

Let's figure out why.
<h1>Step 1 - Let's check errors. But ... how?</h1>
Ok, cool. How do we do that? We will first start by checking what, if any, errors are being output in the console. Let's look at the settings ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-1-498x1024.png" /></center>

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-2-498x1024.png" /></center>

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-3-498x1024.png" /></center>

Huh? No way to check for errors directly in app - but there is this remote debugging option. Let's read up on that! We'll check the MDN first for <a href="https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging">Remote Debugging</a>. Neat! We can enable <a href="https://developer.mozilla.org/en-US/docs/Tools/about:debugging">remote debugging via USB</a> for Firefox Android, and debug from the desktop browser. That will work! Following the guides, we'll turn it on for our desktop browser first ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-4.png" /></center>

Now we need to <a href="https://developer.android.com/studio/debug/dev-options">enable developer options</a> ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-5-498x1024.png" /></center>

Now we can actually enable USB debugging ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-6-498x1024.png" /></center>

Sweet, let's turn it on in now in Firefox Android ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-7-498x1024.png" /></center>

Cool. Let's refresh the devices on the debug page for Firefox desktop. I had to replug my usb connection for it to appear in the device list. But we got it! (I've installed Nightly in between these screenshots - more on that in a moment.) ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-8.png" /></center>

There will be a button to connect beside your device. Hit that, and then on your Android device you'll get a prompt to allow USB debugging in the app itself ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-9-498x1024.png" /></center>

<i>Note: If you are doing things in a different order, you may get the pop up at a different moment. Just make sure you allow it, or else the remote debugging cannot work. If you forget, just try connecting again on your Desktop browser, and the prompt should appear on your Android device.</i>

And then on the browser side ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-10.png" /></center>

Success! Sort of, haha. Looks like one of my browsers is out of spec with the other. When we inspect the page it fails.

Easy fix, right? Keep reading.

We'll just swap out to Nightly - the developer version of Firefox which uses nightly builds. This should ensure that both our desktop and Android versions are in sync with the latest build.

The settings on Nightly are moved around, but its the same general process. So after enabling remote USB we get ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-11.png" /></center>

Dope.

Annnnd now let's check the console out by inspecting the page! ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-12.png" /></center>

Ermm ... What? No errors? Let's check the app ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-13-498x1024.png" /></center>

... Well that's awkward ... It's working in Nightly ... Great, I guess?

Looks like whatever the bug / issue will eventually be fixed in a future update. We have the choice of either
<ul>
 	<li>A. Forgetting about it, and it will hopefully be fixed at some point in the future.</li>
 	<li>B. We keep going and see what broke.</li>
</ul>
Well, this is supposed to be a learning experience. Let's go with option B and investigate some more.
<h1>Step 2 - Let's take a step back! Does that mean this is the real step 1? Second Step 1 it is!</h1>
Ok. At this point we can stop using Nightly, and go back to good ole Firefox and try to get the versions in sync with eachother. Google Play is telling me there are no new updates yet though. Soooo the only obvious option then would be to roll back my Firefox Desktop? That might do the trick, but sounds like a lot of work for a silly Tic Tac Toe blog post ...

Let's stop and think for a second. Is there another angle I havn't considered? What could have broke on one browser, and not the others? Was there some non standard implementation we used? Hmm... Well there was that one thing... Let's go back to this:
<pre><code class="language-javascript">  class TicTacToeGame{

    constructor(){
      ...

      // Create an observer function to respond to application resizing
      const resiveObserver = new ResizeObserver(observer =&gt; {
        this.resizeGame();
        this.drawBoard();
      });
      resiveObserver.observe(document.getElementById("game-wrapper"));

      ...
    }
  }</code></pre>
Full disclosure: I was already aware ResizeObserver was not implemented by all the major vendors, and was expecting this issue to pop up. (But, that's not the entire issue - keep reading)

Observables have had a mixed reception from the community and W3C. For whatever reason Observables are a controversial subject in the JavaScript world (Typical🤷‍♀️). Let's take a look at the <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">current browser support from MDN</a> ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-14.jpg" /></center>

Annnnd there's the likely problem. It's not supported on Firefox for Android, or Safari for that matter (which I don't have the means to test right now). That is also a likely explanation on why it's working on Nightly - they've added support for ResizeObserver at some point it seems.

Let's just double check that it was accepted into ECMAScript (JavaScript's official standard). We'll look at the <a href="https://drafts.csswg.org/resize-observer-1/">official documentation</a>. Yes, it looks like it is in the drafting phase and is not yet finalized. That's promising, but still an issue.

Where do we go from here? Like before we can simply wait for ResizeObserver to be supported. Will it? Likely, but not necessarily. There is no guaruntee it will make it to Firefox for Android (or Safari for that matter), or worse yet it could in theory be totally rejected and deprecated. This doesn't even consider the fact that we havn't even confirmed this is the actual bug yet. Soooo, is there another way? Sure, we could try a polyfill!
<h1>Step 3 - Polyfill!</h1>
What's a polyfill? A polyfill is a script someone has written in pure javascript as a place holder implementation of a future feature of the language. Sometimes ECMAScript will accept a proposal, but does not necessarily have a set in stone implementation. They will iterate drafts until they arrive on something the community can agree on, and then finalize. We use polyfills in the mean time to implement the draft recommendations, and to experiment.

Google has pointed me to <a href="https://github.com/juggle/resize-observer">this repo</a>. Looks perfect! As of writing it looks like they do not have a precompiled distributable package, so we can compile ourselves, <a href="https://github.com/juggle/resize-observer/issues/76#issuecomment-527476415">or alternatively we can use a CDN</a>. The CDN seems easiest for now, so let's do that.

Let's modify our HTML
<pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;

&lt;head&gt;
  &lt;title&gt;Tic Tac Toe&lt;/title&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

  &lt;!-- Tic Tac Toe --&gt;
  &lt;link rel="stylesheet" type="text/css" href="style.css"&gt;

  &lt;!-- Import in ESM compatible browsers --&gt;
  &lt;script type="module"&gt;
    import { ResizeObserver } from 'https://cdn.pika.dev/@juggle/resize-observer/v2';
    window.ResizeObserver = ResizeObserver;
  &lt;/script&gt;

  &lt;!-- Import in older browsers, using requirejs --&gt;
  &lt;script nomodule src="https://unpkg.com/requirejs/require.js"&gt;&lt;/script&gt;
  &lt;script nomodule&gt;
    require.config({
      paths: {
        '@juggle/resize-observer': 'https://cdn.pika.dev/@juggle/resize-observer/v2?'
      }
    })
    require(['@juggle/resize-observer'], function (module) {
      window.ResizeObserver = module.ResizeObserver;
    })
  &lt;/script&gt;
  &lt;script src="game.js"&gt;&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;div id="game-wrapper"&gt;
    &lt;div id="game"&gt;
      &lt;div id="player-bar"&gt;
        &lt;span id="p1" class="player-label"&gt;
          Player 1
        &lt;/span&gt;
        &lt;span id="p2" class="player-label"&gt;
          Player 2
        &lt;/span&gt;
        &lt;span id="player-turn-indicator"&gt;
        &lt;/span&gt;
      &lt;/div&gt;
      &lt;canvas id="game-canvas"&gt;&lt;/canvas&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;script&gt;
    var game = new TicTacToeGame();
  &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;</code></pre>
And that should do it. Let's give it a try!

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-15-498x1024.png" /></center>

Annnnd it failed! It failed in both Firefox and Nightly. Atleast we can check the console in Nightly ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-16.png" /></center>

Ooook. The CDN is failing to load the module.
<h2><b>(╯°□°）╯︵ ┻━┻)</b></h2>
<h1>Step 3 - Two Steps back!</h1>
Ok. Ofcourse it wouldn't be easy. Before we waste a ton of time trying to figure out where we're going wrong, let's back it up and do it the right way. We will stop being lazy and rollback our Firefox version. But let's first figure out which one is out of sync.

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-17-498x1024.png" /></center>

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-18.png" /></center>

Oook. That's a big difference. Let's first see what the <a href="https://www.mozilla.org/en-US/firefox/all/#product-android-release">latest version of Firefox on Android</a> is ... And it's up to date at version 68.7.0 as of this writing.

So rolling back Firefox desktop is the way to go. There is the Extended Support Release (ESR) that we can download. Awesome! It's at version 68.6.1. That should work then.

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-19.png" /></center>

Alright. Rolled back! We'll have to enable remote debugging again I imagine. Let's do that now!

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-20-1024x324.png" /></center>

What? ಠ_ಠ

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-21.jpg" /></center>

Is this version too old? <a href="https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Firefox_for_Android">Let's check MDN again</a>...

What? ಠ_ಠ

It says remote debugging is only enabled for version &gt; 67. The current ESR falls into that requirement, so what's wrong? Let's <a href="https://developer.mozilla.org/en-US/docs/Tools/about:debugging">go back to the documentation</a>. Yup:

<code>If your about:debugging page is different from the one displayed here, go to about:config, find and set the option devtools.aboutdebugging.new-enabled to true.</code>

¯\(°_o)/¯

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-22.png" /></center>
<h1>Step 4 - Cartwheel 1 - Let's check the errors</h1>
We're back to where we started. I've reverted the HTML, and we'll check the console output ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-23.png" /></center>

What? ಠ_ಠ

<code>SyntaxError: fields are not currently supported game.js:8:2</code>
<pre><code class="language-javascript">class TicTacToeCell {

  contains = 0; // This is causing the error?

  ...
}</code></pre>
What? ಠ_ಠ

It doesn't support fields? Ooooook, let's <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields">check the documentation</a>. Holy cow. I've spent so much time programming TypeScript that I forgot that class fields are not technically part of the spec!

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-24-1024x481.png" /></center>

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-25-1024x434.png" /></center>
<h1>Step 5 - How do we fix?</h1>
Let's just put this back.

<b>┳━┳ ノ( ゜-゜ノ)</b>

Ok. So we identified two issues with our code. We have a lack of support for ResizeObserver, and apparently some sloppy code use and bad practice with fields. I can't in good conscience leave it this way. We need to fix these.

So we have two options for both the field and observer:
<h3>Fields</h3>
<ol>
 	<li>Move all the fields into their respective constructors, as would be standard practice.</li>
 	<li>Rewrite in TypeScript, and build targeting ES5.</li>
</ol>
<h3>ResizeObserver</h3>
<ol>
 	<li>Figure out where the CDN is erroring, or use a prebuilt script.</li>
 	<li>Include it with TypeScript and build targeting ES5.</li>
</ol>
My preference is option 2 in both cases. TypeScript has excellent build tools, and linting. These issues would have been either non-existant, or trivial to fix if we had used TypeScript from the get go. However, that would be against the spirit of this excercise.

I think we need to go with option 1. We committed to doing this purely in JavaScript, so we should see it through with JavaScript.

Cthulu save us. 🐙
<h1>Step 6 - Three sheets to the wind 🍺🍻🍷</h1>
Ok. Fixing the JavaScript shouldn't be too bad actually. All we need to do is place the public / private fields inside of the constructors for their respective classes. I won't go over all of the code, but here's an example:
<pre><code class="language-javascript">class TicTacToeCell {
  constructor(){
    this.contains = 0;
    this.winner = false;
  }
}</code></pre>
Yup. Not too hard. I'll be throwing out all the JSDoc Comments though.

Let's see if it worked ...

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-26-498x1024.png" />
<h2><b>PROGRESS!</b>🎉🎊🎈🥳</h2>
But ...

</center>

<center><img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-27.png" /></center>

Ok, we can work with that.
<h1>Step 7 - Poly 2 Electric Boogaloo</h1>
Ok. Lets go back to the polyfill. The previous repo was targeted at a higher version of JavaScript than I think we can work with. Google pointed me at an <a href="https://github.com/que-etc/resize-observer-polyfill">older repo</a> where we may have more luck. It also conveniently comes with a distributable. We'll grab the oldest version we can, which is ResizeObserver.global.js. It is noted that this file will be deprecated in their next release - but it's good enough for now. Let's give it a shot.
<pre><code class="language-html">&lt;head&gt;
  &lt;title&gt;Tic Tac Toe&lt;/title&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

  &lt;!-- Tic Tac Toe --&gt;
  &lt;link rel="stylesheet" type="text/css" href="style.css"&gt;

  &lt;script src='ResizeObserver.global.js'&gt;&lt;/script&gt;

  &lt;script src="game.js"&gt;&lt;/script&gt;
&lt;/head&gt;</code></pre>
<center>
Annnnnnnnd 🥁 <b>DRUM ROLL</b> 🥁

<img style="max-height: 480px; max-width: 100%;" src="https://kdill.ca/wp-content/uploads/2020/04/tictactoe-v2-28-498x1024.png" />

( •_•)&gt;⌐■-■

(⌐■_■)

Gottem.

</center>
<h1>Step 8 - Play Tic Tac Toe</h1>
✨✨✨It works - <b>AGAIN</b>!✨✨✨ Have an embedded iframe. If that doesn't work go try it out at <a href="https://kdill.ca/examples/TicTacToe/v2/">here.</a>

<center>
<iframe src="https://kdill.ca/examples/TicTacToe/v2/" width="100%" height="480px" scrolling="yes"> </iframe></center>
<h1>Final Thoughts</h1>
<h2>Do we keep it?</h2>
So in general I am not a huge fan of polyfills, and I avoid them when I can. There's no guarantee they themselves don't have bugs, or non-standard implementations. They have a tendency to overwrite globals, which is bad, and is exactly what I've used here. Preferably we should try to use the <a href="https://github.com/sindresorhus/ponyfill">Ponyfill</a> philosophy whenever possible. Ponyfill are good practice in my opinion, and explicitly do not replace global features as a design decision.

Polyfill aside, ResizeObserver works in all the major desktop browsers currently, and many of the mobile browsers too. Also, as of writing (April 2020), <a href="https://caniuse.com/#feat=resizeobserver">it looks as if it will be included into Firefox for Android, Safari Desktop, and Safari on mobile</a> in the very near future. That covers well over the majority of the browser market share. Because of this I don't feel compelled to keep this specific polyfill. It will sort itself out in the near future, so there is no need to muddy up the code for such a simple project. We'll remove it in future iterations.
<h2>What I've learned trouble shooting today:</h2>
<ul>
 	<li>Firefox has 4 versions on desktop?! Firefox, Firefox Developer, Firefox Nightly, and Firefox ESR. Neat.</li>
 	<li>Firefox has remote debugging. It was a pain to get working, but it's honestly great once it's up and running. On Nightly it's fantastic.</li>
 	<li>I havn't touched JS since es2015 was in beta, and apparently need to revisit it more thoroughly. I've forgotten a lot.</li>
 	<li>Fields are not part of the spec yet. They will be though, so thats cool.</li>
 	<li>ResizeObservers are still being iterated on, but look like they're close to being fully implemented by all the major vendors. That's great!</li>
 	<li>Side thing I learned and did not mention in this post so far; Microsoft has an amazing app called 'Your Phone'. It was an absolute godsend to get photos off my device. Super cool.</li>
</ul>
Lastly, I cannot in good conscience leave the project in this state as something I can show off. We'll need to revisit and implement some of the changes I mentioned in the first part ... I think we'll use TypeScript and Angular for that though next time.

Anyway, this has been a fun exercise in frustration. If you made it this far, thanks for reading!

Be sure to check out the source at [GitHub](https://github.com/DillK/TicTacToe).

Read more posts like this on [kdill.ca](https://kdill.ca)

Thanks for reading!

Kev

# **MIT License**
>Copyright © 2020 Kevin Dill, kdill.ca
>
>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.