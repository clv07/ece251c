# ECE251C Project  
**Members:** Livia Chandra, Noah Jongeling

## Overview
This project is based on the implementation from the paper:

> A. Carson, A. Wright, J. Chowdhury, V. Välimäki, and S. Bilbao,  
> “Sample rate independent recurrent neural networks for audio effects processing,”  
> Proc. 27th Int. Conf. Digital Audio Effects (DAFx24), Guildford, UK, 2024.

We explore the sample-rate-independent RNN proposed in the paper and extend it with our own code experiments.


## Repository Structure

### Original Code From Paper [1]
- `rnn.py` – Baseline and sample-rate-independent RNN implementations  
- `giant_fft_resample.py` – High-fidelity sample-rate conversion using Giant FFTs  
- `process_audio.py` – Example script showing usage and computing SNR between modified RNN and baseline  
- `sine_analysis.py` – Sine-sweep analysis and SNR vs. frequency plots (Fig. 8 in the paper)  
- `conda_env_cpu.yaml` – Environment file for creating the conda environment  
- `BlackstarHT40_AmpHighGain.json` - One of LSTM model provided in the original repository downloaded from the [Guitar ML Tone Library](https://guitarml.com/tonelibrary/tonelib-pro.html)
- `audio/test_signal_input.wav` - Test signal input files.

### Our Contributions
- `rnn_fb.ipynb`
  - Loads audio inputs  
  - Uses the `soundfile` library (instead of `torchaudio`) to avoid SR-related errors  
  - Modified `process_audio.py` to run multiple SR-independent RNN configurations  
  - Used `BlackstarHT40_AmpHighGain` LTSM model and `audio/test_signal_input.wav` as input files 
  - Computes and displays SNR values  

## Running Instructions
- Create virtual environment to run the Jupyter notebook
```bash
conda env create -f conda_env_cpu.yaml
conda activate sr_indie_rnn
```
