---
title: Condensed Matter
date: June 20, 2022
author: Andi Gu
---

This is a collection of notes from my study of the *Oxford Solid State* textbook [@simon_solid_2013].

# Crude Materials Models

We begin by exploring some of the most rudimentary models for materials first developed in the early 1900s.

## Einstein's Model

The simplest (nontrivial) model for a monatomic crystal is to say each atom sits in a non-interacting 3D simple harmonic well with a frequency $\omega$, so that the energy levels are $E_{n_x,n_y,n_z} = \hbar \omega (n_x+n_y+n_z+3/2)$. The partition function of one atom is then $$Z=\sum_{(n_z,n_y,n_z) \geq 0} \exp(-\beta E_{n_x,n_y,n_z})=\frac{e^{-3\beta \hbar \omega/2}}{(1-e^{-\beta \hbar \omega})^3}.$$ From, this we can calculate the energy: $$\expval{E}=-\pdv{\ln Z}{\beta} = 3\hbar \omega/2 + 3\frac{\hbar\omega e^{-\beta \hbar \omega}}{1-e^{-\beta \hbar \omega}}.$$ This results in a heat capacity $$C = \pdv{\expval{E}}{\tau}=3(\beta \hbar \omega)^2 \frac{e^{\beta \hbar \omega}}{(e^{\beta \hbar \omega}-1)^2}.$$ The limiting behavior of this heat capacity at high temperature is simple, as we can then approximate $e^{\beta \hbar \omega}=1+\beta \hbar \omega$ and find $C\approx 3$.[^1] However, at small temperature, $C \approx 3\frac{(\beta \hbar \omega)^2}{e^{\beta \hbar \omega}}.$ This is an exponential surpression, which, as it turns out, is too fast. The known experimental behavior is that $C \sim \frac{1}{\beta^3}$, which this model is unable to reproduce. Another weakness of this model is that it leaves a free parameter $\omega$, which is typically fit to experimental data.

[^1]: It is important to note we are working in units where $k_B=1$. In conventional units, this simply says $C=3k_B$, which is a well-known result obtainable by applying classical analysis.

## Debye's Model

Debye's model took a different approach to Einstein. Debye still used the idea that the energy of a solid is stored in vibrations that permeate the solid -- however, he allowed these vibrations to have different frequencies, rather than the uniform frequency $\omega$ used by Einstein. More specifically, he used a fairly typical assumption, that the dispersion relationship in the solid is that of free space: $\omega(\vec{k})=v \abs{\vec{k}}$, where $v$ is the speed of sound in the solid. Now, the wavenumber $\vec{k}$ could not just be anything: Debye required that sound waves in the solid obey a periodic boundary condition, so that each component of $\vec{k}$ had to be an integer multiple of $\frac{2\pi}{L}$ (assuming a cubic solid with side length $L$). This periodic boundary condition may seem somewhat artificial (and indeed it is), but it is reasonable to assume that what happens inside the bulk of the material ought to be independent of the conditions we oppose far away at the boundary. It is important to understand that in this picture, each individual wave (i.e., one setting of $\vec{k}$) can be occupied up to $n$ times. That is, there are quanta of vibration known as `phonons', which are like photons, except that they have discrete values of $\omega$. Classically, this corresponds to an increasing vibration amplitude at the wavenumber $\vec{k}$.

We now calculate the partition, where we use the trick of approximating a sum over discrete configurations $\vec{k}$ with an integral over $\vec{k}$ (which is exact in the limit $L \rightarrow \infty$). The cube is due to the fact that there are three independent modes of oscillation (two transverse and one longitudinal).
\begin{align*}
    Z &= \qty(\prod_{\vec{k}} \sum_{n \geq 0} \exp(-(n+1/2) \beta \hbar \omega(\vec{k})))^3 \\
    &= \qty(\prod_{\vec{k}} \frac{\exp(-\beta \hbar \omega(\vec{k})/2)}{1-\exp(-\beta \hbar \omega(\vec{k}))})^3
\end{align*}
Therefore, the energy is:
\begin{align*}
    \expval{E} &= -3 \sum_{\vec{k}} \pdv{\beta} \ln(\frac{\exp(-\beta \hbar \omega(\vec{k})/2)}{1-\exp(-\beta \hbar \omega(\vec{k}))}) \\
    &= \frac{3L^3}{(2\pi)^3} \int \hbar \omega(\vec{k}) \qty(\frac{1}{\exp(\beta \hbar \omega(\vec{k}))-1}+\frac{1}{2}) \dd{\vec{k}} \\
    &= \frac{3L^3}{(2\pi)^3} \int_0^\infty 4\pi k^2 \hbar v k \qty(\frac{1}{\exp(\beta \hbar v k)-1}+\frac{1}{2}) \dd{k}
\end{align*}
We drop the zero-point energy corresponding to the constant $\frac{1}{2}$. Then, calculating the integral, we find:
\begin{align*}
    \expval{E} &= \frac{3L^3}{(2\pi)^3} (4\pi \hbar v) \int_0^\infty \frac{k^3}{\exp(\beta \hbar v k) - 1} \dd{k} \\
    &= \frac{3L^3}{(2\pi)^3} \frac{(4\pi \hbar v)}{(\beta \hbar v)^3} \int_0^\infty \frac{u^3}{e^u - 1} \dd{u} \\
    &= \frac{3L^3}{(2\pi)^3} \frac{(4\pi \hbar v)}{(\beta \hbar v)^4} \frac{\pi^4}{15} \\
    &= \frac{3L^3}{2\pi^2 \hbar^3 v^3} \frac{\pi^4}{15} T^4
\end{align*}
We see that $\expval{E} \sim T^4$, which correctly recovers $C \sim T^3$, as desired. However, this expression indicates that the $C \sim T^3$ rule holds for all temperatures, which we know cannot be the case.

To remedy this, Debye proposed there could only be as many oscillation modes as the number of atoms. That is, $3N=3\frac{4\pi k_{max}^3}{3} \frac{L^3}{(2\pi)^3} \implies k_{max}^3=6\pi^2 \frac{N}{L^3}$. This replaces the integral $\int_0^\infty \frac{u^3}{e^u - 1} \dd{u}$ with $\int_0^{k_{max} \beta \hbar v} \frac{u^3}{e^u - 1} \dd{u}$. Note that the mass of this integral is concentrated near $u \sim \order{1}$, so for low temperature (high $\beta$), it is valid to approximate this integral as extending to infinity. The validity of this approximation depends on $k_{max} \gg \frac{1}{\beta \hbar v}\implies \frac{N}{L^3} \gtrsim \frac{T^2}{(\hbar v)^2}$. On the other hand, for high temperature, we are better off approximating the integral using $\frac{u^3}{e^u-1} \approx u^2$ for small $u$, in which case we get $\int_0^{k_{max} \beta \hbar v} \frac{u^3}{e^u - 1} \dd{u} \approx \frac{(k_{max} \beta \hbar v)^3}{3}$. Plugging this back into our expression for energy, we find
\begin{align}
\expval{E} &= \frac{3L^3}{2\pi^2 \hbar^3 v^3} \frac{(k_{max} \beta \hbar v)^3}{3} T^4 \\
&= \frac{L^3}{2\pi^2} \frac{6N\pi^2}{L^3} T \\
&= 3N T
\end{align}
This gives a heat capacity (per atom) $C = 3$, as expected.

## Bonds

There are three general categories of atomic bonds: ionic, covalent, and Van der Waals. Ionic bonding can be understood classically. On the other hand, covalent bonding requires a somewhat more quantum understanding. The simplest model might be the particle-in-a-box model. Specifically, take two hydrogen atoms, each of which we model as a infinite square well with length $L$. The electrons in each well has energy $\frac{\hbar^2 \pi^2}{2m L^2}$. However, when we bring the two wells together, the wells combine to form a well of length $2L$, so the energy falls to $\frac{\hbar^2 \pi^2}{2m (2L)^2}$, a reduction in energy. This is energetically preferable, explaining dihydrogen bonds. However, when the two lowest energy eigenstates (two because a spin up and spin down state can fit in the ground state), the next highest energy state is $\frac{\hbar^2 \pi^2}{2m L^2}$, which is no different than the original eigenenergies. It turns out that when the nuclear and electronic repulsion energies are considered, this bonding situation is energetically unfavorable (which explains why helium does not bond to helium).

A more precise description might be as follows. Consider two hydrogen atoms a fixed distance apart, and a single electron orbiting the two. The Hamiltonian is given by $$H = \frac{p^2}{2m} + V_1 + V_2$$, where $V_1,V_2$ represent the Coulomb potential of the electron due to the first and second nuclei, respectively. The nuclear repulsion is omitted because this does not affect the electron. We now propose a variational ansatz $\ket{\psi}=\alpha \ket{1} + \beta \ket{2}$, where $\ket{1}$ and $\ket{2}$ are the electronic orbitals for the first and second atom *alone*. This is known as the tight binding model because these electronic orbitals are closely bound to each respective nuclei. We define $\epsilon_0$ to be the energy of $\ket{1}$ when the second nucleus is not present, that is: $(K+V_i) \ket{i}=\epsilon_0 \ket{i}$. Now, the time independent Schrodinger equation reads $\alpha H \ket{1} + \beta H \ket{2} = E \qty(\alpha \ket{1} + \beta \ket{2})$. We hit this on the left with $\bra{1}$ and $\bra{2}$ to find:
\begin{align*}
\alpha H_{11} + \beta H_{12} &= E (\alpha + \beta \braket{1}{2}) \\
\alpha H_{21} + \beta H_{22} &= E (\beta + \alpha \braket{2}{1})
\end{align*}
In matrix form, letting $v \equiv \mqty[\alpha \\ \beta]$:
$$
\mqty[H_{11} & H_{12} \\ H_{21} & H_{22}] v = E \mqty[1 & \braket{1}{2} \\ \braket{2}{1} & 1] v.
$$
Now, we define $V_{cross}$ with $H_{11}=H_{22}=\epsilon_0 + \expval{V_2}{1}=\epsilon_0 + V_{cross}$, and $H_{12}=\mel{1}{H}{2}=(\epsilon_0+V_{cross}) \braket{1}{2} + \mel{1}{V_1}{2}=\epsilon_0 \braket{1}{2} - t$. This gives an eigenvalue equation:
$$
\frac{1}{1-\abs{\braket{1}{2}}^2} \mqty[(1-\abs{\braket{1}{2}}^2)(V+\epsilon_0) + \braket{1}{2} t^* & -t \\ -t^* & (1-\abs{\braket{1}{2}}^2)(V+\epsilon_0) + \braket{2}{1} t] v = Ev
$$
The eigenenergies of this equation are $\epsilon_0 + V_{cross} + \frac{\Re(t \braket{1}{2}) \pm \sqrt{\Im((t \braket{1}{2})^2) + \abs{t}^2}}{1-\abs{\braket{1}{2}^2}}$. When the two orbitals are orthonormal (which is not the case as the atoms get close), we have $\braket{1}{2}=0$, so the energies reduce to $\epsilon_0 + V_{cross} \pm \abs{t}$ and the eigenvectors reduce to $\frac{1}{\sqrt{2}}\qty(\ket{0}\pm \ket{1})$. The $t$ term is known as a `hopping' term, because it roughly corresponds to the likelihood that the electron hops from one orbital to the other.