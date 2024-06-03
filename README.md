## Solace ~ Your Mental Health Coach

Solace is a full-stack website that uses Google's Gemini API and voice transcription to provide an immersive chatting experience. Our LLM is engineered to follow CBT methodology by addressing and deconstructing users' concerns and stressors. We also use a text classifier to help users track their emotions over time, allowing them to use Solace as a journal.

## Inspiration
*What if you could live a life free from negative thoughts?* <br><br>
Your thoughts and actions define the way you feel. It follows that negative, inaccurate, or unfair thoughts completely darken your outlook on life. We created Solace to help you journal your inaccurate, negative, or unfair thoughts. Then, using AI and a research proven method called cognitive behavorial therapy, our app helps you identify harmful thinking styles and practice changing them. Eventually, thinking on the brighter side will become second nature.

## What it does
*Solace is your therapy companion wherever you go.* <br><br>
As you share your negative thoughts, Solace guides you to a more fair and balanced way of thinking. Over time, you will collect a personal record of amended thinking, forming the unique story of your journey towards better well-being.

## How we built it
We used Google’s Gemini-1.5-Flash model as our AI therapist and OpenAI’s Whisper for speech-to-text. For text-to-speech, we evaluated several models but eventually settled on using one of Coqui.ai’s models, as it had low latency while not sounding too robotic. We used TypeScript with React to implement our frontend and allow users to either type in or record their messages. To facilitate transfer of the user’s audio file and the text-to-speech file, we used Cloudify’s content delivery network, which turned our audio files into usable URLs. Furthermore, we used the Bert, a large language classification model, which performed our sentiment analysis of user’s messages.

## Challenges we ran into
<ul>
<li>Text-to-speech: balancing latency and roboticness of voice models</li>
<li>Transferring audio files between frontend and backend</li>
<li>Recording the audio files from the frontend and getting them into a usable format</li>
<li>Front-end: Creating multiple journal entries and switching between entries</li>
</ul>

## Accomplishments that we're proud of
<ul>
<li>Implementing voice recognition with low latency</li>
<li>Successfully using a content delivery network to connect our frontend and backend</li>
<li>Implementing a text-to-speech model that is both efficient and relatively human-sounding</li>
<li>Engineering Gemini to create an empathetic cognitive behavorial therapist</li>
</ul>

## What we learned
<ul>
<li>Utilizing various AI-oriented APIs via pipelines or local models</li>
<li>Using content delivery networks to transfer files between the frontend and backend</li>
<li>Using TypeScript with React to create an effective frontend</li>
<li>Communicate often to avoid making costly assumptions</li>
</ul>

## What's next for Solace
We hope to potentially add multiple user support and additionally make Solace into a mobile app.
