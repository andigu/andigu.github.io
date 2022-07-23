---
title: Geometric Algebra
date: June 28, 2022
author: Andi Gu
description: Geometric algebra notes from the Geometric Algebra for Physicists textbook.
keywords: geometric algebra, notes, physics
---

This is a collection of notes from my study of the *Geometric Algebra for Physicists* textbook  [@doran2007]. 

# Foundations

The entire structure of geometric algebra can be boiled down to the geometric product, which is a binary operation between two vectors $a$ and $b$. The usual rules of a vector space apply to these vectors, and the usefulness of geometric algebra is in the structure revealed by the product $ab$. This product satisfies three fairly natural axioms.

1. It is associative: $(ab)c=a(bc)$
2. It distributes over addition: $a(b+c)=ab+ac$
3. The square of any vector is real: $a^2 \in \mathbb{R}$. We do not make the assumption that $a^2 \geq 0$ to allow for the possibility of spaces with mixed signature (e.g., Minkowski space).

It is important not to interpret this product $uv$ as another vector. In fact, $uv$ is a sum of a scalar element $u \in \mathbb{R}$ and a 'bivector' $V$: $ab=u + V$ -- this should be understood as something like a complex number $u+iv$. In fact, for a vector space of dimension 2, this analogy is exact. In general, the bivector should be pictured as a directed area, or an object like the angular momentum in classical mechanics. This analogy extends further: we can have a trivector, which is an oriented volume, and so on and so forth. 

However, this geometric product is not so exotic. We can still understand it in terms of some familiar concepts. For one, we observe that $(a+b)^2$ is always real, so we must have $a^2+ab+ba+b^2 \in \mathbb{R} \implies ab + ba \in \mathbb{R}$. We have found that the symmeterized geometric product is a binary relation between vectors that outputs a real number -- that is, a dot product! So we define $$a \cdot b = \frac{(ab+ba)}{2}.$$ We define the remaining part of the product as the exterior product (which might be thought of as replacing the role of the cross product): $$a \wedge b = \frac{ab-ba}{2}.$$ This then gives $ab=a \cdot b + a \wedge b$: a sum of a scalar and a bivector, as promised.

Well, technically, not yet: we do not have a good reason to believe we should understand $a \wedge b$ as a bivector (or a directed area) yet. So we define it as such, and show this definition conforms to our intuition later. More precisely, we define exterior product of $r$ vectors as the full anti-symmeterized product over all of them: $$a_1 \wedge a_2 \wedge \ldots \wedge a_r = \frac{1}{r!}\sum_{\sigma \in \mathbb{S}_r} (-1)^{\sigma} a_{\sigma(1)} a_{\sigma(2)} \ldots a_{\sigma(r)},$$ where $\mathbb{S}_r$ is the set of all permutations on $r$ elements and $(-1)^\sigma$ is the sign of a permutation. A consequence of this definition is that the product reverses sign under exchange of any two vectors. Then, we see that if any vector is repeated, the exterior product must be zero, which then implies if the vectors are linearly dependent, the exterior product is also zero (this follows simply by distributivity of the geometric product under addition). Therefore, the outer product can be understood to measure the dimensionality of a set of vectors. We say that the outer product of $r$ vectors has grade $r$ (if it does not vanish). A multivector that can be written purely as an outer product is called a blade.

::: {.lemma #blade-product}
Any blade $a_1 \wedge \ldots \wedge a_r$ can be written simply as a product of orthogonal vectors $e_1 \ldots e_r$. This justifies our idea that a blade with $r$ vectors can be interpreted as a directed area for $r=2$, volume for $r=3$, and so on. 
:::

::: proof
Let $A_{i,j}=a_i \cdot a_j$. Since $A_{i,j}$ is a symmetric matrix, it can be diagonalized with $P^T D P$, where $P$ is orthogonal. Letting $e_i= P_{i,k} a_k$, we see that $e_i \cdot e_j = P_{i,k} P_{j,\ell} a_k \cdot a_\ell = P_{i,k} A_{k,\ell} (P^T)_{\ell,j} = D_{i,j}$. Therefore, these vectors obey $e_i e_j = -e_j e_i$ for $i \neq j$. Finally, since $e_i = P_{i,k} a_k \implies a_k = P_{i,k} e_i$:
$$
a_1 \wedge \ldots \wedge a_r = \frac{1}{r!}\sum_{\sigma \in \mathbb{S}_r} (-1)^\sigma P_{i_1,\sigma(1)} P_{i_2,\sigma(2)} \ldots P_{i_r,\sigma(r)} e_{i_1} e_{i_2} \ldots e_{i_r}
$$
Note that we have the restriction $i_1 \neq i_2 \neq \ldots \neq i_r$ due to the antisymmeterization of the sum. Therefore, we can rewrite as:
\begin{align*}
a_1 \wedge \ldots \wedge a_r &= \frac{1}{r!}\sum_{\rho,\sigma \in \mathbb{S}_r} (-1)^\sigma P_{\rho(1),\sigma(1)} P_{\rho(2),\sigma(2)} \ldots P_{\rho(r),\sigma(r)} e_{\rho(1)} e_{\rho(2)} \ldots e_{\rho(r)} \\
&= \frac{1}{r!}\sum_{\rho,\sigma \in \mathbb{S}_r} (-1)^{\rho^{-1}}(-1)^\sigma P_{1,\sigma(\rho^{-1}(1))} P_{2,\sigma(\rho^{-1}(2))} \ldots P_{r,\sigma(\rho^{-1}(r))} e_{1} e_{2} \ldots e_{r} \\
&= \sum_{\alpha \in \mathbb{S}_r} (-1)^{\alpha} P_{1,\alpha(1)} P_{2,\alpha(2)} \ldots P_{r,\alpha(r)} e_{1} e_{2} \ldots e_{r} \\
&= \det(P) e_1 \ldots e_r
\end{align*}
In the second line, the factor $(-1)^{\rho^{-1}}$ comes from unshuffling $e_{\rho(1)} \ldots e_{\rho(r)} \rightarrow e_1 \ldots e_r$, and in the third line, we use the fact that for any function $f$ that depends only on $\sigma \circ \rho^{-1}$: $\sum_{\rho, \sigma \in \mathbb{S}_r} f(\sigma \circ \rho^{-1}) = r! \sum_{\alpha \in \mathbb{S}_r} f(\alpha)$, where $\alpha$ plays the role of $\sigma \circ \rho^{-1}$. Now, observe that $\det(P)= \pm 1$, and in the case where $\det(P)=-1$, we can simply reorder $e_1,
\ldots,e_r$ to get rid of the negative sign.
:::


In general, multivectors can be comprised of elements with different grades. For a set of orthogonal vectors, we say that $e_i$ has grade 1, $e_i e_j$ (for $i \neq j$) has grade 2, and so on. We define $\expval{\cdot}_r$ to be the component of a multivector with grade $r$, so that in general a multivector $A$ in a geometric algebra $\mathcal{G}_n$ (whose underlying vector space has dimension $n$) can be written $A=\sum_{r=0}^n \expval{A}_r$. A multivector that satisfies $\expval{A}_r=A$ (for some $r$) is called homogenous.

We denote the subspace of $\mathcal{G}_n$ of grade $r$ as $\mathcal{G}_n^r$. The dimensionality of $\mathcal{G}_n^r$ is $\binom{n}{r}$, because the basis of $\mathcal{G}_n^r$ can be formed by choosing $r$ items from the $n$ basis vectors.[^not-blades] The overall dimensionality is therefore $\sum_{r=0}^n \binom{n}{r}=2^n$.

[^not-blades]: It is important to note that not every multivector in $\mathcal{G}_n^r$ is a blade. The simplest nontrivial example is $e_1 e_2 + e_3 e_4$ in $\mathcal{G}_n^4$ -- there is simply no way to write this as a blade because ${e_1,e_2}$ and ${e_3,e_4}$ are orthogonal to each other. 

## The Dot and Wedge Product
We now study the behavior of $a B_r$, where $a$ is some vector and $B_r$ is a homogenous multivector of grade $r$. More specifically, we will show that we can define $a \cdot B_r$ and $a \wedge B_r$ in terms of $aB_r$ and $B_r a$ in a way that is similar to the original definition for $\cdot$ and $\wedge$ between two ordinary vectors.

::: {.theorem #dot}
For any $a \in \mathcal{G}_n^1$ and $B_r \in \mathcal{G}_n^r$, $\qty(a B_r - (-1)^r B_r a)$ is a homogenous multivector with grade $r-1$. This motivates the definition
$$
a \cdot B_r \coloneqq \frac{1}{2} (aB_r - (-1)^r B_r a),
$$ {#eq:dot}
so that $\cdot$ is a grade-lowering operation. 
:::

:::proof
We assume $B_r$ is a blade, since all of the above statements are linear in $B_r$. That is, it suffices to show that the above statement is true for $B_r=e_1 e_2 \ldots e_r$, for any choice of orthogonal vectors $\qty{e_1,\ldots,e_r}$. We repeatedly apply $ab = 2a \cdot b - ba$. Observe that $aB_r = 2 (a \cdot e_1) e_2 \ldots e_r - e_1 a e_2 \ldots e_r$. We can repeatedly do this, shifting $a$ further back in the chain, to get:
$$
aB_r = 2 \sum_{k=1}^r (-1)^{k+1} (a \cdot e_k) (e_1 \ldots \check{e}_k \ldots e_r) + (-1)^r B_r a,
$$
where $\check{e}_k$ denotes the fact that $e_k$ is omitted from the product (i.e. $e_1 \check{e}_2 e_3 = e_1 e_3$). A simple rearrangement gives:
$$
\frac{1}{2} \qty(aB_r - (-1)^r B_r a) = \sum_{k=1}^r (-1)^{k+1} (a \cdot e_k) (e_1 \ldots \check{e}_k \ldots e_r)
$$ {#eq:dot-expansion}
Note that in the sum, $e_1 \ldots \check{e}_k \ldots e_r$ is grade $r-1$. So, $\frac{1}{2} \qty(aB_r - (-1)^r B_r a)$ is a linear combination of blades, each of which are grade $r-1$ -- so it is on the whole a homogenous multivector of grade $r-1$.
:::

A similar result holds for the wedge product $\wedge$.

::: {.theorem #wedge}
For any blade $B_r = b_1 \wedge \ldots \wedge b_r$ and any vector $a$:
$$
a \wedge b_1 \wedge \ldots \wedge b_r = \frac{1}{2}\qty(a B_r + (-1)^r B_r a)
$$
:::

:::proof
Let $e_1, \ldots e_r$ be an orthogonalization of $b_1, \ldots b_r$ using the same technique as @Pre:blade-product, such that $b_1 \wedge \ldots \wedge b_r = e_1 \ldots e_r$. Then, let $a_\perp = a - \sum_{k=1}^r \beta_k e_k$, where:
$$
\beta_k = \begin{cases}
\frac{a \cdot e_k}{(e_k \cdot e_k)^2} & \qq{if $e_k \cdot e_k \neq 0$} \\
0 &\qq{otherwise}
\end{cases}
$$
Letting $a_\parallel = \sum_{k=1}^r \beta_k e_k$, we can write $a = a_\parallel + a_\perp$, and it is now simple to see that $a_\perp \cdot e_k = 0$ for all $k=1,\ldots,r$. Furthermore, since each of the $e_k$ are merely linear combinations of $b_k$, $a_\perp \cdot b_k=0$ for all $k=1,\ldots,r$ as well. Therefore, $a \wedge b_1 \wedge \ldots \wedge b_r=a_\perp \wedge b_1 \wedge \ldots \wedge b_r$.

Now, observe that:
\begin{align*}
a_\parallel B_r + (-1)^r B_r a_\parallel = \sum_{k=1}^r \beta_k \qty((-1)^{k+1}(e_k)^2 e_1 \ldots \check{e}_k \ldots e_r + (-1)^r (-1)^{r-k} e_1 \ldots \check{e}_k \ldots e_r (e_k)^2) \\
&= 0
\end{align*}
Therefore, using the crucial fact that $a_\perp b_k = -b_k a_\perp$:
\begin{align*}
a B_r + (-1)^r B_r a &= a_\perp B_r + (-1)^r B_r a_\perp \\
&= \frac{1}{r!}\sum_{\sigma \in \mathbb{S}_r} (-1)^{\sigma}\qty(a_\perp b_{\sigma(1)} \ldots b_{\sigma(r)} + (-1)^r b_{\sigma(1)} \ldots b_{\sigma(r)} a_\perp) \\
&= \frac{2}{r!} \sum_{\sigma \in \mathbb{S}_r} (-1)^\sigma a_\perp b_{\sigma(1)} \ldots b_{\sigma(r)} \\
&= \frac{2}{(r+1)!} \sum_{k=1}^{r+1} \sum_{\sigma \in \mathbb{S}_r} (-1)^\sigma a_\perp b_{\sigma(1)} \ldots b_{\sigma(r)}
\end{align*}
Now, observe that we are free to scramble $a_\perp$ somewhere into the $k$th position of $b_{\sigma(1)} \ldots b_{\sigma(r)}$ -- that is, $a_\perp b_{\sigma(1)} \ldots b_{\sigma(r)}=(-1)^k b_{\sigma(1)} \ldots b_{\sigma(k-1)} a_\perp b_{\sigma(k)} \ldots b_{\sigma(r)}$. But then, viewing $a_\perp$ as the first element of the set $S = [a_\perp, b_1, \ldots, b_r]$, so that we identify $b_0 = a_\perp$ and $S \cong [0, \ldots, r]$, we see that the permutation that sends $S$ to $[b_{\sigma(1)},\ldots,b_{\sigma(k-1)},a_\perp,b_{\sigma(k)},\ldots,b_{\sigma(r)}] \cong [\sigma(1),\ldots,\sigma(k-1),0,\sigma(k),\ldots,\sigma(r)]$ has parity $(-1)^k (-1)^\sigma$! Therefore, the double sum over $\sum_{k=1}^{r+1} \sum_{\sigma \in \mathbb{S}_r}$ can be rewritten as a sum over permutations mapping $[0,\ldots,r]$ onto itself -- that is, $\mathbb{S}_{r+1}$. We are then left with:
\begin{align*}
a B_r + (-1)^r B_r a &= \frac{2}{(r+1)!} \sum_{\sigma \in \mathbb{S}_{r+1}} b_{\sigma(0)} \ldots b_{\sigma(r)} \\
&= 2 a \wedge b_1 \wedge \ldots \wedge b_r,
\end{align*}
as required. 
:::

:::corollary
For any multivector $B_r \in \mathcal{G}_n^r$, let $a \wedge B_r$ be defined by:
$$
a \wedge B_r \coloneqq \frac{1}{2} (aB_r + (-1)^r B_r a),
$$ {#eq:wedge}
so that $a \wedge B_r$ is always a homogenous multivector of grade $r+1$. That is, $\wedge$ raises grade by $1$.
:::

:::proof
This follows simply by decomposing $B_r$ into a linear combination of blades and applying @Pre:wedge to each blade (observing that $a \wedge B_r$ is bilinear)
:::

It follows trivially from the definitions in @eq:dot and @eq:wedge that $a B_r=a \cdot B_r + a \wedge B_r$, which says that the product $aB_r$ is a sum of homogenous multivectors with grade $r \pm 1$. This can be generalized for a general multivector $A_s$. Since $A_s$ can be written as a linear combination of blades, and each blade can be written as a product of anticommuting (orthogonal) vectors, $A_s B_r$ is composed of multivectors with grades $\abs{r-s}, \abs{r-s}+2, \ldots, r+s$. To further generalize the dot and wedge product notation, when we write $A_s \cdot B_r$, we mean the lowest grade component of $A_s B_r$, and the highest for $A_s \wedge B_r$:
\begin{align}
A_s \cdot B_r &= \expval{A_s B_r}_{\abs{s-r}} \\
A_s \wedge B_r &= \expval{A_s B_r}_{s+r}
\end{align}
We also define a scalar product $\expval{A_1 A_2 \ldots A_k}$ to be the grade 0 (i.e., scalar) component of the product $A_1 A_2 \ldots A_k$.


::: {.lemma #wedge-associative}
The wedge product is associative:
$$
(A_r \wedge B_s) \wedge C_t = A_r \wedge (B_s \wedge C_t),
$$
so we can write $A_r \wedge B_s \wedge C_t$ unambiguously. 
:::

:::proof
Recall that we can expand
$$A_r B_s = \expval{A_r B_s}_{r+s} + \expval{A_r B_s}_{r+s-2} + \ldots + \expval{A_r B_s}_{\abs{r-s}}.$$
Since $(A_r \wedge B_s) \wedge C_t = \expval{A_r B_s}_{r+s} \wedge C_t$:
\begin{align*}
\expval{A_r B_s}_{r+s} C_t &= \qty(\expval{A_r B_s}_{r+s} C_t)_{r+s+t} + \qty(\expval{A_r B_s}_{r+s} C_t)_{r+s+t-2} + \ldots \\
&= \expval{(A_r B_s) C_t}_{r+s+t} + \ldots,
\end{align*}
where the $\ldots$ means all remaining terms have lower grade. Therefore, $(A_r \wedge B_s) \wedge C_t=\expval{(A_r B_s) C_t}_{r+s+t}$. Finally, by associativity of the geometric product (recall, this is one of the axioms), $\expval{(A_r B_s) C_t}_{r+s+t}=\expval{A_r (B_s C_t)}_{r+s+t}=A_r \wedge (B_s \wedge C_t)$.
:::

::: {.lemma #trip-prod}
For any vectors $a$, $b_1,\ldots,b_r$:
$$
a \cdot (b_1 \wedge \ldots \wedge b_r) = \sum_{k=1}^r (-1)^{k+1} (a \cdot b_k) b_1 \ldots \check{b}_k \ldots b_r.
$$
:::

:::proof
Since
$$
a \cdot (b_1 \ldots b_r) = a \cdot \expval{b_1 \ldots b_r}_r + a \cdot \expval{b_1 \ldots b_r}_{r-2} + \ldots,
$$
by taking the $r-1$th component of each side, we find:
$$
\expval{a \cdot (b_1 \ldots b_r)}_{r-1} = a \cdot \expval{b_1 \ldots b_r}_r,
$$
and since $\expval{b_1 \ldots b_r}_r=b_1 \wedge \ldots \wedge b_r$:
$$
a \cdot (b_1 \wedge \ldots \wedge b_r) = \frac{1}{2}\expval{a b_1 \ldots b_r - (-1)^r b_1 \ldots b_r a}_{r-1}
$$
Repeatedly applying the identity $ab = 2 (a \cdot b) - ba$:
\begin{align*}
a \cdot (b_1 \wedge \ldots \wedge b_r) &= \expval{\sum_{k=1}^r (-1)^{k+1} (a \cdot b_k) b_1 \ldots \check{b}_k \ldots b_r}_{r-1} \\
&= \sum_{k=1}^r (-1)^{k+1} (a \cdot b_k) b_1 \ldots \check{b}_k \ldots b_r
\end{align*}
:::

:::remark

The above result (@Pre:trip-prod) is a generalization of the vector triple product identity in $\mathbb{R}^3$ which says $a \cross (b \cross c)=(a \cdot c)b - (a \cdot b)c$. The analogy is *not* with $a \cdot (b \cross c)$, because in three dimensions, cross product between a vector and a pseudovector $b \cross c$ is actually a dot product the language of geometric algebra. This fact originates in the fact that the pseudovector $b \cross c$ is really a bivector, and ordinary vector algebra lacks the language the make this fact clear. We discuss this further below.
:::

## A Few Additional Operations
We define the reverse of a product of vectors to be
$$
(a_1 \ldots a_r)^\dagger = a_r \ldots a_1.
$$
Therefore, for an arbitrary blade $A_r$, by writing $A_r=e_1 \ldots e_r$, we see that $A_r^\dagger=(-1)^{r(r-1)/2} A_r$, since $r(r-1)/2$ swaps occur in order for a complete reversion $e_1 \ldots e_r \rightarrow e_r \ldots e_1$. If we enforce $(A + B)^\dagger = A^\dagger + B^\dagger$, we can easily see that for *any* homogenous multivector $A$ of grade $r$ (not just blades), $A^\dagger = (-1)^{r(r-1)/2} A$. 

:::lemma
The scalar product is invariant under cyclic permutation:
$$
\expval{A_1 A_2 \ldots A_k} = \expval{A_2 A_3 \ldots A_k A_1} = \ldots = \expval{A_k A_1 \ldots A_{k-1}}
$$
We sometimes write $A * B = \expval{AB}$.
:::

:::proof
For any $A,B$, we have $\expval{AB}=\expval{AB}^\dagger$ since the grade of $\expval{AB}$ is $r=0$, so $(-1)^{r(r-1)/2}=1$. By the linearity of the reversion operator, $\expval{AB}^\dagger=\expval{(AB)^\dagger}$. This can be seen by writing $AB$ as a sum of homogenous multivectors, and applying $^\dagger$ to both sides. Since $(AB)^\dagger=B^\dagger A^\dagger$, we have $\expval{AB}=\expval{B^\dagger A^\dagger}$. Finally, we observe that if the grade of $A$ and $B$ is $r$ and $s$ respectively, the lowest grade component of $AB$ is $\abs{r-s}$. Therefore, if $r \neq s$, $\expval{AB}=0=\expval{BA}$. If $r=s$, then $\expval{AB}=\expval{B^\dagger A^\dagger}=(-1)^{r(r-1)}\expval{BA}=\expval{BA}$. So, it holds in general that $\expval{AB}=\expval{BA}$.

Now, for any $m$, we can choose $A=A_1 \ldots A_m$ and $B=A_{m+1} A_{m+2} \ldots A_k$ to find $\expval{A_1 \ldots A_k}=\expval{A_{m+1}A_{m+2} \ldots A_k A_1 \ldots A_m}$ for any $m = 1, \ldots, k$. This gives the desired result.
:::

Another product is the commutator $$A \times B = \frac{1}{2} (AB-BA).$$ Note that for a bivector $B$ and a vector $a$, the commutator is equal to the dot product:
$$
B \times a = \frac{1}{2} (Ba - aB) =-a \cdot B =-\expval{aB}_1 =-\expval{B^\dagger a^\dagger}_1 = \expval{Ba}_1 = B \cdot a
$$

It turns out that this is a specific case of a more general property, which we state below.

::: {.lemma #comm-grade}
For any homogenous multivector $A_r$, $B \times A_r$ is also a homogenous multivector of grade $r$. Specifically, $B \times A_r=\expval{BA_r}_r$.
:::

:::proof
We decompose $B A_r= \expval{BA_r}_{r-2} + \expval{BA_r}_r + \expval{BA_r}_{r+2}$. Now, we reverse both sides. 
\begin{align*}
-(-1)^{r(r-1)/2} A_r B &= (-1)^{(r-2)(r-3)/2} \expval{BA_r}_{r-2} + (-1)^{r(r-1)/2}\expval{BA_r}_r + (-1)^{(r+1)(r+2)/2}\expval{BA_r}_{r+2} \\
-A_r B &= (-1)^{-2r+3} \expval{BA_r}_{r-2} + \expval{BA_r}_r + (-1)^{4r+1} \expval{BA_r}_{r+2} \\
A_r B &= \expval{BA_r}_{r-2} - \expval{BA_r}_r + \expval{BA_r}_{r+2}
\end{align*}
Therefore, it is simple to see that $\frac{1}{2} (B A_r - A_r B) = \expval{BA_r}_r$.
:::

@Pre:comm-grade gives a useful identity:
$$
B A_r = B \cdot A_r + B \times A_r + B \wedge A_r
$$

Finally, in spaces of a finite dimension $n$, all multivectors with grade $n$ are unique up to a scalar multiplier. We define the pseudoscalar $I$ to be the unique multivector of grade $n$ such that $\abs{I^2}=1$.[^sign] The pseudoscalar defines an orientation for the space -- that is, any blade will have either the same or different sign as $I$, which corresponds to a positive or negative orientation, respectively. The pseudoscalar is useful because it defines a duality transformation mapping blades to their orthogonal component $A_r \rightarrow I A_r$. Note that $I A_r$ has grade $n-r$ because the $r$ basis vectors from $A_r$ combine with $r$ components of $I$, leaving $n-r$ basis vectors. Because of this duality transformation, as one might expect, it can also be used to transform between the dot and wedge product.

::: {.lemma #duality}
For any multivectors $A_r, B_s$ such that $r+s \leq n$:
$$
A_r \cdot (B_s I) = A_r \wedge B_s I.
$$
:::

::: proof
\begin{align*}
A_r \cdot (B_s I) &= \expval{A_r B_s I}_{\abs{r-(n-s)}} \\
&= \expval{A_r B_s I}_{n-(r+s)} \\
&= \expval{A_r B_s}_{r+s} I \\
&= A_r \wedge B_s I
\end{align*}
:::

[^sign]: The sign of $I^2$ depends on the dimension $n$ and the signature of the space. 

## Rotations and Reflections

Vectors can be reflected with respect to some direction (i.e. unit vector) $n$. This reflection ought to take $n \rightarrow -n$, and leave all vectors perpendicular to $n$ unchanged. Finally, it ought to be linear. The map $$f(a) = -nan$$ does exactly this. We see that $f(n)=-nnn=-n$, and for vectors $n_\perp$ orthogonal to $n$, $f(n_\perp)=-n n_\perp n = nn n_\perp=n_\perp$. This also ensures that for any vector $a$, $f(a)$ is still a vector. 

Vectors can also be rotated with respect to some plane. This plane is described by two unit basis vectors $n$ and $m$, or by the bivector $n \wedge m$. Two successive reflections about vectors $m$ then $n$ results in a rotation. That is, $$f(a)=nmamn$$ is a rotation. It is trivial to see that this leaves vectors perpendicular to both $n$ and $m$ unchanged. We also verify that $f(a) \cdot f(b) = a \cdot b$, as required by definition of a rotation.
\begin{align*}
f(a) \cdot f(b) &= \frac{1}{2} \qty(nmamn nmbmn + nmbmn nmamn) \\
&= \frac{1}{2} \qty(nm ab mn + nm ba mn) \\
&= nm (a \cdot b) mn \\
&= a \cdot b
\end{align*}
We call the product $R=nm$ a rotor, and therefore rotors generate rotations via $R a R^\dagger$. Since rotations form a group, composing rotations $a \rightarrow R_1 R_2 a R_2 R_1$ results in another rotation. Therefore, we say that $R_1 R_2$ is also a rotor. That is, rotors also form a group. In general, rotors are simply geometric products of an even number of vectors with the normalization condition $R R^\dagger = 1$.

This description of rotation leads to interesting behavior on multivectors. For instance, take some geometric product $a_1 \ldots a_k$. If we rotate each of the component vectors, we get $(Ra_1R^\dagger)(R a_2 R^\dagger) \ldots (R a_k R^\dagger) = R a_1 \ldots a_k R^\dagger$. We get similar behavior for a blade (since the blade is just a linear combination of geometric products). Therefore, the rotation transformation for arbitrary multivectors $A$ is still $R A R$. 

## Frames

A set of linearly independent vectors $\qty{\vb{e_1}, \ldots, \vb{e_n}}$ is called a frame in geometric algebra. We do not necessarily assume these are orthonormal vectors, so they do not (in general) commute. We define the volume element $$E_n=\vb{e}_1 \wedge \ldots \wedge \vb{e}_n, $$ and the reciprocal frame $\qty{\vb{e}^1,\ldots,\vb{e}^n}$ by
$$
\vb{e}_j \cdot \vb{e}^k = \delta_j^k.
$$  {#eq:recip}
We can write an explicit form for the reciprocal vectors:
$$
\vb{e}^k = (-1)^{k+1} (\vb{e}_1 \wedge \ldots \wedge \check{\vb{e}}_k \wedge \ldots \vb{e}_n) E_n^{-1}.
$$
Recall the $\check{\vb{e}}_k$ means that this term is omitted. Intuitively, what this says is that $\vb{e}^k$ is orthogonal to each basis vector except $\vb{e}_k$, and we add the inverse volume element $E_n^{-1}$ at the end to normalize. More rigorously, we can verify that this definition satisfies @eq:recip by making use of the duality transformation in @Pre:duality.
\begin{align*}
\vb{e}_j \cdot \vb{e}^k &= \vb{e}_j \cdot \qty((-1)^{k+1} (\vb{e}_1 \wedge \ldots \wedge \check{\vb{e}}_k \wedge \ldots \vb{e}_n) E_n^{-1}) \\
&= (-1)^{k+1} \vb{e_j} \wedge \vb{e}_1 \wedge \ldots \wedge \check{\vb{e}}_k \wedge \ldots \vb{e}_n E_n^{-1}
\end{align*}
Note that if $j \neq k$, the wedge product vanishes. Otherwise, $(-1)^{k+1} \vb{e_j} \wedge \vb{e}_1 \wedge \ldots \wedge \check{\vb{e}}_k \wedge \ldots \vb{e}_n = E_n$. Therefore, we recover our desired result $\vb{e}_j \cdot \vb{e}^k = \delta_j^k$. 

Once we have chosen a frame for our space, we can write vectors as linear combinations of the frame basis vectors: $$a = a^i \vb{e}_i = a_i \vb{e}^i,$$ where we are using Einstein summation notation. By the reciprocal property in @eq:recip, we can see that $a^i = a \cdot \vb{e}^i$ and $a_i = a \cdot \vb{e}_i$. Therefore, $a \cdot \vb{e}_i \vb{e}^i = a \cdot \vb{e}^i \vb{e}_i = a$ (recall that the order of operations is $\cdot$ and $\wedge$ before the geometric product). This is an instance of a more general fact.

::: lemma
For any frame $\qty{\vb{e}_i}$ and any homogenous multivector $A_r$, $$\vb{e}_i \vb{e}^i \cdot A_r = r A_r.$$
:::

::: proof
We apply @eq:dot-expansion. We also assume $A_r$ is a blade that can be written as a product of orthogonal vectors $\vb{a}_1 \vb{a}_2 \ldots \vb{a}_r$ (the general case follows trivially because the desired identity is linear in $A_r$).
\begin{align*}
\vb{e}_i \vb{e}^i \cdot A_r &= \vb{e}_i \sum_{k=1}^r (-1)^{k+1} (\vb{e}^i \cdot \vb{a}_k) (\vb{a}_1 \ldots \check{\vb{a}}_k \ldots \vb{a}_r) \\
&= \sum_{k=1}^r (-1)^{k+1} \vb{a}_k \vb{a}_1 \ldots \check{\vb{a}}_k \ldots \vb{a}_r \\
&= \sum_{k=1}^r \vb{a}_1 \ldots \vb{a}_r \\
&= r A_r
\end{align*}
:::

Since $\qty{\vb{e}_1, \ldots, \vb{e}_n}$ spans $\mathbb{R}^n$, any blade of degree $r$ can be written as a linear combination of wedge products $\vb{e}_i \wedge \ldots \wedge \vb{e}_j \wedge \vb{e}_k$. This holds similarly for the reciprocal frame $\qty{\vb{e}^1, \ldots, \vb{e}^n}$. Therefore, any homogenous multivector $A$ of grade $r$ can be expanded:
$$
A = \sum_{i_1 < i_2 < \ldots < i_r} A_{i_1 \ldots i_r} \vb{e}^{i_1} \wedge \ldots \vb{e}^{i_2} \wedge \vb{e}^{i_r}
$$
An explicit formula for the components $A_{i_1 \ldots i_r}$ can be given:
$$
A_{i_1 \ldots i_r} = \expval{(e_{i_r} \wedge \ldots \wedge e_{i_1}) A}
$$