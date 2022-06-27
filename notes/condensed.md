---
title: Condensed Matter
date: June 20, 2022
author: Andi Gu
description: Condensed matter notes from the Oxford Solid State textbook.
---

This is a collection of notes from my study of the *Oxford Solid State* textbook [@simon_solid_2013].

# Crude Materials Models

We begin by exploring some of the most rudimentary models for materials first developed in the early 1900s. These models do not account for any microscopic structure within the material -- they simply posit the elementary components are oscillators that are independent of other components (whether these components are individual atoms or phonon modes).

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
Now, we define $V_{cross}$ with $H_{11}=H_{22}=\epsilon_0 + \expval{V_2}{1}=\epsilon_0 + V_{cross}$, and $H_{12}=\mel{1}{H}{2}=(\epsilon_0+V_{cross}) \braket{1}{2} + \mel{1}{V_1}{2}=\epsilon_0 \braket{1}{2} - t$. The eigenenergies of this equation are $E=\epsilon_0 + V_{cross} + \frac{\Re(t \braket{1}{2}) \pm \sqrt{\Im((t \braket{1}{2})^2) + \abs{t}^2}}{1-\abs{\braket{1}{2}^2}}$. When the two orbitals are orthonormal (which is not the case as the atoms get close), we have $\braket{1}{2}=0$, so the energies reduce to $\epsilon_0 + V_{cross} \pm \abs{t}$ and the eigenvectors reduce to $\frac{1}{\sqrt{2}}\qty(\ket{0}\pm \ket{1})$. The $t$ term is known as a `hopping' term, because it roughly corresponds to the likelihood that the electron hops from one orbital to the other.

# Materials Models in One Dimension

## Monatomic System

We now begin to account for the structure of our materials. We no longer pretend the atoms are all independent of one another, and model them as attached to their neighbours with some spring that has a spring constant $\kappa$. Furthermore, we restrict ourselves to one dimension. This spring model is a good approximation when the atoms are sitting at the bottom of the potential well, and the neighborhood of the well that is accessible is well-described by a parabola. Anharmonic terms will enter if we escape this regime.

Let the position of the $n$th atom in our chain be $x_n$. The equilibrium position has each of these atoms separated by some distance $a$. In this case, the potential energy of the system is: $$V = \frac{1}{2}\sum_{n} \kappa (x_n-x_{n-1})^2.$$ The force on each individual atom is then $$F_n=\kappa (x_{n+1}-2x_n+x_{n-1}) =\kappa(\delta x_{n+1} - 2\delta x_n + \delta x_{n-1}),$$ where $\delta x_n = x_n - na$ is the deviation of the $n$th atom from its equilibrium position. This gives us a set of coupled differential equations: $$\ddot{\delta x_n} = \frac{\kappa}{m} (\delta x_{n+1}-2\delta x_n + \delta x_{n-1}).$$ Plugging in an ansatz $\delta x_n=e^{i (\omega t - k n a)}$, this gives $-\omega^2 = \frac{\kappa}{m} (e^{ika} - 2 + e^{-ika})$, so: 
$$\omega = 2\sqrt{\frac{\kappa}{m}} \abs{\sin(\frac{ka}{2})}$$ {#eq:1d-dispersion}

```{#fig:1d-dispersion .py2image caption="Dispersion function for monoatomic one-dimensional system"}
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

k = np.linspace(-np.pi, np.pi, 251, endpoint=True)
plt.plot(k, 2*np.abs(np.sin(k/2)))
plt.xlabel(r'Wavenumber $k$ (in units of $a^{-1}$)')
plt.ylabel(r'Frequency $\omega$, in units of $(\kappa/m)^{1/2}$')
plt.savefig("$DESTINATION$", format="$FORMAT$", transparent=True)
```

In @fig:1d-dispersion, we plot the dispersion relation @eq:1d-dispersion. This is a first exposure to a nonlinear dispersion function (compare this with Debye's assumption that $\omega = vk$). We observe a few features. First, for small $k$ (long wavelength), the dispersion remains linear. However, close to $k=2\pi/a$, the dispersion relation becomes flat. Secondly, this dispersion is periodic under shifts of $2\pi/a$. This is a simple consequence of the fact that the atoms are spaced by $a$, so wavelengths less than $a$ will be aliased. Thus, we define the first Brillouin zone to be $-\pi/a \leq k \leq \pi/a$. In momentum space, we can define a lattice just like the lattice of atoms $x_n = na \Leftrightarrow G_n = n \frac{2\pi}{a}$. This leads to the concept of *crystal momentum*, which is just momentum modulo factors of $\frac{2\pi}{a}$. It turns out that, while momentum $k$ is not necessarily conserved, crystal momentum *is* conserved. This can be understood by Noether's theorem, which implies that translational invariance leads to conservation of momentum. However, we have *discrete* translational invariance here, which leads to the conservation of crystal momentum alone.

One further restriction we might make is to attach boundary conditions to our chain. For periodic conditions, we will have the constraint $e^{i \omega t} = e^{i \omega t - ikL} \implies k=n \frac{2\pi}{L}$. Therefore, in $k$ space, the momentum modes are separated by $\frac{2\pi}{L}$. Coupled with the fact that all momentum modes lie in $[-\pi/a,\pi/a]$ (modulo $2\pi/a$), there are $\frac{2\pi/a}{2\pi/L}=\frac{L}{a}=N$ unique normal modes. This justifies Debye's assumption.

Now, there is a principle known as the quantum correspondence principle, which says that if a classical harmonic system has a normal oscillation mode at frequency $\omega$, the corresponding quantum system has eigenstates of energy $\hbar \omega (n+1/2)$. Therefore, in the quantum picture of our system, we have quanta of vibration known as phonons that each have energy $\hbar \omega$. The average number of these occupying a given mode will be $\frac{1}{\exp(\beta \hbar \omega)-1}$ (with a $-1$ rather than $+1$ because phonons are not subject to some exclusion principle -- that is, they are bosons). The energy, and therefore heat capacity, can then all be calculated in a straightforward way[^2] with $$U=\sum_{k} \frac{\hbar \omega(k)}{\exp(\beta \hbar \omega(k))-1} \approx \frac{L}{2\pi}\int_{-\pi/a}^{\pi/a} \frac{\hbar \omega(k)}{\exp(\beta \hbar \omega(k))-1} \dd{k}.$$ Notice this again retains the expected behavior $C = \frac{L}{a}=N$ at high temperatures.

[^2]: We have dropped the zero-point energy corresponding to the $\frac{1}{2}$ constant in the SHO energy.

## Diatomic System
We now complicate the situation somewhat by introducing another atom of different weight. Say the connections between atoms varies with $\ldots A \xleftrightarrow{\kappa_1} B \xleftrightarrow{\kappa_2} A \xleftrightarrow{\kappa_1} B \ldots$, where $\xleftrightarrow{\kappa_1}$ represents a spring with spring constant $\kappa_1$, and $A,B$ represent two different species of atoms (with different masses). This type of configuration might be conceivable as a toy model of a material that has covalent bonding within molecules (comprised of one $A$ and one $B$ atom) and Van der waals bonding from molecule to molecule. 

We group our substance into $n$ molecules $(A,B)$, with the displacement of $A$ and $B$ from their equilibrium position in the $n$th molecule denoted $x_n$ and $y_n$, respectively. We immediately find the equations of motion:
\begin{align*}
\ddot{x}_n &= \frac{\kappa_1 (y_n-x_n) - \kappa_2 (x_n-y_{n-1})}{m_1} \\
\ddot{y}_n &= \frac{\kappa_2 (x_{n+1}-y_n) - \kappa_1 (y_n-x_n)}{m_2}
\end{align*}
We let the equilibrium position of $A$ in the $n$th molecule be $na$. Then, plugging in the ansatz $x_n=A_x e^{i (\omega t - k n a)}$ (with a similar ansatz for $y_n$), we get an eigenvalue equation:
$$
\mqty[\frac{\kappa_1+\kappa_2}{m_1} & -\frac{\kappa_1 + \kappa_2 e^{ika}}{m_1} \\ -\frac{\kappa_1 + \kappa_2 e^{-ika}}{m_2} & \frac{\kappa_1 + \kappa_2}{m_2}] \mqty[A_x \\ A_y] = \omega^2 \mqty[A_x \\ A_y]
$$
This is solved by:
\begin{align*}
0 &= \qty(\frac{\kappa_1+\kappa_2}{m_1}- \omega^2)\qty(\frac{\kappa_1+\kappa_2}{m_2}-\omega^2) - \frac{\kappa_1+\kappa_2 e^{ika}}{m_1} \frac{\kappa_1+\kappa_2 e^{-ika}}{m_2} \\
&= m_1 m_2 \omega^4 - (\kappa_1+\kappa_2)(m_1+m_2)\omega^2 + 2 \kappa_1 \kappa_2 \qty(1-\cos(ka))
\end{align*}
Defining the reduced mass $\mu=\frac{m_1m_2}{m_1+m_2}$, we find that the roots of the above are given by:
$$
\omega^2 = \frac{\kappa_1+\kappa_2}{2\mu} \qty(1 \pm \sqrt{1 - \frac{16m_1 m_2 \kappa_1 \kappa_2 \sin^2(ka/2)}{(\kappa_1+\kappa_2)^2(m_1+m_2)^2}})
$$ {#eq:1d-dispersion-diatomic}
We define the parameter $\alpha \equiv 16\frac{m_1 m_2 \kappa_1 \kappa_2}{(\kappa_1+\kappa_2)^2 (m_1+m_2)^2}$. Observe that $0 \leq \alpha \leq 1$, and in some sense measures how similar the two atoms are: when $\kappa_1=\kappa_2$ and $m_1=m_2$, $\alpha=1$. The qualitative behavior of the dispersion relation (up to the factor $\frac{\kappa_1+\kappa_2}{2\mu}$) is determined by this parameter $\alpha$. In @fig:1d-dispersion-diatom, we plot this dispersion relation as a function of $\alpha$. If we extend into the second Brillouin zone by evaluating the $+$ branch of $\omega$ (@eq:1d-dispersion-diatomic) for $\abs{ka} \in [\pi, 2\pi]$, we find striking behavior. For $\alpha=1$, we recover the monatomic dispersion function (@fig:1d-dispersion), as expected. However, as we move away from $\alpha=1$, we get a gap that widens as $\alpha \rightarrow 0$.

```{#fig:1d-dispersion-diatom .py2image caption="Dispersion function for diatomic one-dimensional system at various $\alpha$. The dashed lines represent an extension of the dispersion into the second Brillouin zone."}
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

x = np.linspace(-np.pi, np.pi, endpoint=True, num=51)[:,None]
y = np.linspace(-2*np.pi, -np.pi, endpoint=True)[:,None]
alpha = np.linspace(0.9, 1, 3)[None,:]
omega = np.sqrt((1 - np.sqrt(1-alpha*np.sin(x/2)**2)))
omega2 = np.sqrt((1 + np.sqrt(1-alpha*np.sin(y/2)**2)))
omega3 = np.sqrt((1 + np.sqrt(1-alpha*np.sin(x/2)**2)))
colors = plt.get_cmap('jet')(np.linspace(0,1,num=len(alpha.squeeze())))
for i in range(len(colors)):
    plt.plot(x,omega[:,i], c=colors[i], label=alpha[0,i]);
    plt.plot(y,omega2[:,i], color=colors[i], ls='--', alpha=0.8, lw=0.9);
    plt.plot(-y,omega2[:,i], color=colors[i], ls='--', alpha=0.8, lw=0.9);
    plt.plot(x, omega3[:,i], c=colors[i])
plt.axvline(-np.pi, c='black', ls='-.')
plt.axvline(np.pi, c='black', ls='-.')
plt.legend(title=r'$\alpha$')
plt.ylabel(r'$\omega$, in units of $(\kappa_1+\kappa_2)^{1/2}/(2\mu)^{1/2}$')
plt.xlabel(r'$k$ (in units of $a^{-1}$)')
plt.savefig("$DESTINATION$", format="$FORMAT$", transparent=True)
```

The upper branch of the dispersion relation is known as the optical branch, because it couples more strongly with visible light than the bottom branch, known as the acoustic branch. We gain some insight into these names by seeing what happens at $k \rightarrow 0$ (long wavelength limit). Here, the two modes will have $A_x=A_y=1$ (acoustic mode) and $A_x=-\frac{m_2}{m_1}, A_y=1$ (optical mode). In the acoustic mode, this is essentially a synchronized oscillation of every atom in the material, which agrees with the picture of sound as long wavelength compressions. On the other hand, in the optical mode, the two atoms in any molecule will oscillate out-of-sync with each other by 180 degrees (when $m_2=m_1$).

## Tight Binding Models

The previous two models have been attempts to describe oscillations of atoms in a material. We turn now to electrons, and will work within the 'tight-binding' model. This assumes that the full electronic wavefunction can be described as a linear combination of the unperturbed electronic orbitals. More precisely, let our chain of atoms be identified as $1, \ldots, N$. Then, let $\ket{j}$ be the wavefunction for the valence electron on the $j$th atom. The tight binding model says that the ground state of electrons, when the atoms are brought together, is well approximated by $\sum_j c_j \ket{j}$. We further assume for convenience that $\braket{j}{\ell}=\delta_{j,\ell}$. 

Our model is as follows. The Hamiltonian for one electron will be $H = \frac{p^2}{2m} + \sum_j V_j$, where $V_j$ is the Coulomb potential due to the $i$th atom. Then $$\mel{j}{H}{\ell} = \epsilon_{atomic} \delta_{j,\ell} + \sum_{m \neq \ell} \mel{j}{V_m}{\ell}.$$ We assume that $\sum_{m \neq \ell} \mel{j}{V_m}{\ell}=V_0 \delta{j,\ell} - t \delta_{j-1,\ell} - t \delta_{j+1,\ell}$. The $V_0$ term is simply a shift in energy due to the introduction of other nearby Coulomb potentials. The $t \delta_{j \pm 1, \ell}$ term expresses the fact that an electron on orbital $\ket{\ell}$ can only be transferred to another orbital $\ket{j}$ if $j$ and $\ell$ are close (here, if $\abs{j-\ell}=1$). Here, $t$ is known as a hopping strength because the larger the $t$, the larger the probability of a transfer. The overall matrix element is then $$\mel{j}{H}{\ell} = \epsilon_0 \delta_{j,\ell} - t(\delta_{j + 1, \ell} + \delta_{j-1,\ell}).$$

With this framework, we complicate things somewhat by bringing some atoms closer and moving some further like so: $A-A=A-A=A-\ldots$, where $=$ denotes a smaller distance. This changes the hopping strength so that $$\mel{j}{H}{\ell} = \epsilon_0 \delta_{j,\ell} - t((1 \pm \Delta)\delta_{j + 1, \ell} + (1 \mp \Delta)\delta_{j-1,\ell}),$$ where the $\pm$ depends on the parity of $\ell$, and $\Delta$ is a parameter measuring how unequal the $-$ and $=$ distances are. This is known as the Peierls distortion. To solve for the ground state of this Hamiltonian, we substitute an ansatz (up to a constant factor) $\ket{\psi} = \sum_{\ell} A_\ell e^{-i k \ell a} \ket{\ell}$, where $A_0=A_2=A_4=\ldots$ and $A_1=A_3=A_5=\ldots$. Solving the Schrodinger equation yields:
$$
\mqty[\epsilon_0 & -2t (\cos(ka) - i \Delta \sin(ka)) \\ -2t (\cos(ka) + i \Delta \sin(ka)) & \epsilon_0] \mqty[A_0 \\ A_1] = E \mqty[A_0 \\ A_1]
$$
Diagonalizing, we find $E = \epsilon_0 \pm 2t\sqrt{\cos^2(ka) + \Delta^2 \sin^2(ka)}$. This is similar in form to the previously derived dispersion relation in @eq:1d-dispersion-diatomic, except it is now an equation involving $\omega$ rather than $\omega^2$. There is again the appearance of a widening gap as $\Delta$ increases.

```{#fig:1d-dispersion-peierls .py2image caption="Dispersion function for the Peierls distortion."}
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

x = np.linspace(-np.pi/2, np.pi/2, endpoint=True, num=500)[:,None]
y = np.linspace(-np.pi, -np.pi/2, endpoint=True, num=500)[:,None]
alpha = np.linspace(0, 0.2, 3)[None,:]
E = -2*np.sqrt(np.cos(x)**2 + alpha**2 * np.sin(x)**2)
E2 = 2*np.sqrt(np.cos(y)**2 + alpha**2 * np.sin(y)**2)
colors = plt.get_cmap('jet')(np.linspace(0,1,num=len(alpha.squeeze())))
for i in range(len(colors)):
    plt.plot(x,E[:,i], c=colors[i], label=alpha[0,i]);
    plt.plot(y,E2[:,i], c=colors[i]);
    plt.plot(-y,E2[:,i], c=colors[i]);
plt.legend(title=r'$\Delta$')
plt.ylabel(r'$E-\epsilon_0$, in units of $t$')
plt.xlabel(r'$k$ (in units of $a^{-1}$)')
plt.savefig("$DESTINATION$", format="$FORMAT$", transparent=True)
```