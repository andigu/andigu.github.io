---
title: Geometric Algebra
date: June 20, 2022
author: Andi Gu
description: Geometric algebra notes from the Geometric Algebra for Physicists textbook.
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

We now show that any blade $a_1 \wedge \ldots \wedge a_r$ can be written simply as a product of orthogonal vectors $e_1 \ldots e_r$. Let $e_1,\ldots,e_r$ be the orthogonalization of $a_1,\ldots,a_r$ using Gram-Schmidt. We show by induction that $e_1 \ldots e_r=a_1 \wedge \ldots \wedge a_r$. This trivially holds for $r=1$. Then, let us assume $a_1 \wedge \ldots \wedge a_{r-1}=e_1 \ldots e_{r-1}$. We make use of two facts. First, $v \equiv e_r - a_r \in \text{span}(a_1,\ldots,a_{r-1})$, since we used Gram-Schmidt to construct $e_r$. Also, using the anticommuting property of orthogonal vectors (because $a \cdot b = 0 \implies ab = -ba$):
\begin{align*}
e_1 \wedge \ldots \wedge e_{r} &=\frac{1}{r!} \sum_{\sigma \in \mathbb{S}_{r}} (-1)^\sigma e_{\sigma(1)} \ldots e_{\sigma(r)} \\
&=\sum_{\sigma \in \mathbb{S}_{r}} (-1)^\sigma (-1)^\sigma e_1 \ldots e_{r} \\
&=e_1 \ldots e_{r}
\end{align*}
Therefore, 
\begin{align*}
e_1 \ldots e_r &= e_1 \wedge \ldots \wedge e_r \\
&= (a_1 \wedge \ldots \wedge a_{r-1}) \wedge e_r \\
&= (a_1 \wedge \ldots \wedge a_{r-1}) \wedge (a_r+v) \\
&= a_1 \wedge \ldots \wedge a_{r-1} \wedge a_r,
\end{align*}
where the fourth line is due to the fact that $v$ is a linear combination of $a_1, \ldots, a_{r-1}$.

An alternative form of the argument runs with an explicit definition of $e_1,\ldots,e_r$:
$$e_k = a_k \wedge \ldots \wedge a_1 (a_{k-1} \wedge \ldots \wedge a_1)^{-1}.$$ Let $\sigma$ be the permutation that reverses $1,2,\ldots,r \rightarrow r,r-1,\ldots,1$. Observe
\begin{align*}
e_1 \ldots e_r &= (-1)^\sigma e_r \ldots e_1 \\
&= (-1)^\sigma \qty(a_r \wedge \ldots \wedge a_1)(a_{r-1} \wedge \ldots \wedge a_1)^{-1} (a_{r-1} \wedge \ldots \wedge a_1) \ldots \\
&= (-1)^\sigma a_r \wedge \ldots \wedge a_1 \\
&= (-1)^\sigma (-1)^\sigma a_1 \wedge \ldots \wedge a_r \\
&= a_1 \wedge \ldots \wedge a_r
\end{align*}

In general, multivectors can be comprised of elements with different grades. We define $\expval{\cdot}_r$ to be the component of a multivector with grade $r$, so that in general a multivector $A$ in a geometric algebra $\mathcal{G}_n$ (whose underlying vector space has dimension $n$) can be written $A=\sum_{r=0}^n \expval{A}_r$. A multivector that satisfies $\expval{A}_r=A$ (for some $r$) is called homogenous.

We denote the subspace of $\mathcal{G}_n$ of grade $r$ as $\mathcal{G}_n^r$. The dimensionality of $\mathcal{G}_n^r$ is $\binom{n}{r}$, because the basis of $\mathcal{G}_n^r$ can be formed by choosing $r$ items from the $n$ basis vectors. The overall dimensionality is therefore $\sum_{r=0}^n \binom{n}{r}=2^n$.



