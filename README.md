# ECE251C Project  
**Members:** Livia Chandra, Noah Jongeling

## Overview
This project is based on the implementation from the paper:

> [1] A. Carson, A. Wright, J. Chowdhury, V. Välimäki, and S. Bilbao,  
> “Sample rate independent recurrent neural networks for audio effects processing,”  
> Proc. 27th Int. Conf. Digital Audio Effects (DAFx24), Guildford, UK, 2024.
> 
> [GitHub Repository](https://github.com/a-carson/dafx24_sr_indie_rnn)

> [2] Vashkevich, M. I., Wan, W., & Petrovsky, A. A. (n.d.). 
> "Practical design of multi-channel oversampled warped cosine-modulated filter banks."
> Belarusian State University of Informatics and Radioelectronics; Shanghai University.
> 
> [GitHub Repository](https://github.com/Mak-Sim/Warped-filter-bank)

We combine the sample rate independent RNN proposed in Carson et al. and warped cosine-modulated filter banks in Vashkevich et al. to investigate the problem: How do different RNN oversampling strategies perform when the input signal is preprocessed through a warped filter bank?

## Repository Structure
### Inputs
This folder contains LSTM model and input audio files for sample rate independent RNN.
1. `exampleAudio/Example2.wav` - Full-band audio file without WCMFB preprocessing (the second example splitted from `audio/test_signal_input.wav` in Paper 1 repository).
2. `Subchannel_Audio_Example2` - Subband audio file preprocessed by WCMFB (eight channels).
3. `BlackstarHT40_AmpHighGain.json` - One of LSTM model provided in the Paper 1 repository downloaded from the [Guitar ML Tone Library](https://guitarml.com/tonelibrary/tonelib-pro.html)

### Code
This folder contains code implementation for WCMFB preprocessing and sample rate independent RNN.
1. `rnn_process.ipynb` - Jupyter notebook used to run inputs on RNN functions with different sampling rate and produce otuput WAV, CSV, and PNG files.
2. `rnn.py` – Baseline and sample-rate-independent RNN implementations from Paper 1 repository
3. `giant_fft_resample.py` – High-fidelity sample-rate conversion using Giant FFTs from Paper 1 repository 
4. `conda_env_cpu.yaml` – Environment file for creating the conda environment modified from Paper 1 repository
5. `main_script.m` - WCMFB implementation from Paper 2 repository
  
### Outputs
There are five output folders:
1. `outputs_alpha0.5` - Contains output files for inputs preprocessed with WCMFB analysis bank with alpha = 0.5.
2. `outputs_alpha0.7` - Contains output files for inputs preprocessed with WCMFB analysis bank with alpha = 0.7.
3. `outputs_without_cmfb ` - Contains output files for inputs without WCMFB preprocessing.

These three folders share the similar folder structure of having parent folder for the RNN methods run through, having four different sample rates - 44.1kHz, 48kHz, 88.2kHz and 96kHz used within each RNN methods.

`outputs_alpha0.5` and `outputs_alpha0.7` contains both subband outputs, reconstructed outputs, and the optimization plots.

`outputs_csv` and `outputs_png` contain tables summarizing SNR values for different comparison conditions.

Note that all inputs and outpus audio files are WAV files. 
We also made a website to present the input and output WAV files [here](https://clv07.github.io/ece251c/).

## Running Instructions
- Create virtual environment to run the Jupyter notebook
```bash
conda env create -f conda_env_cpu.yaml
conda activate sr_indie_rnn
```
