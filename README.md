# Alune AI
[Alune AI](https://2samferguson.github.io/Alune-AI/) is a web application that utilizes machine learning methods to perform match prediction and evaluation of LoL (League of Legends) team compositions. Users can query the application at any stage of their draft to view the current strength of their team and see which champions would make the best additions.

This repository contains the relevant files for the user interface and front-end machine learning implementation. Model parameters for a given patch are retrieved through fetch requests to the Alune Server, and remaining computations are performed client-side with `model.js`

For a basic overview of the model architecture and training, see the [Alune Server Documentation](https://github.com/2samferguson/Alune-Server).
