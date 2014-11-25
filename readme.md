# Significance

A simple interface for storing memories.

## Why

I built this out of a need to remember and keep track of my week. Our lives pass by so quickly, none of us can remember what we ate for brakefast yesterday. I like making lists of my day but then I just have markdown or text files floating all over the place. This allows me to keep one giant list of everything I put into it, thoughts, words, feelings, actions, recaps, anything. My goal is to take the data and visualize it some day, separating them all out by day via the timestamp. I need to start capturing it now, starting the process of preservation, memories are a commodity and you only have a set amount of them. A lot of detail is lost if you don't capture them soon after they happen. 

## How

The app opens up a REPL, a command line that keeps taking lines of text. This text goes into MongoDB with a timestamp. The app starts up Mongo on it's own and shut's it down, which is really cool.
