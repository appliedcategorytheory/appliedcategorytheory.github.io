#Skew-Monoidal Categories: Logical and Graphical Calculi

*guest post by Wilf Offord

One of the earliest and most well-studied definitions in "higher" category theory is that of a monoidal category. These have found ubiquitous applications in pure mathematics, physics, and computer science; from type theory to topological quantum field theory. The machine making them tick is MacLane's _coherence theorem_: if anything deserves to be called "the fundamental theorem" of monoidal categories, it is this. As such, numerous other proofs have sprung up in recent years, complementing MacLane's original one. One strategy with a particularly operational flavour uses _rewriting systems_: the morphisms of a free monoidal category are identified with normal forms for some rewriting system, which can take the form of a logical system as in ([UVZ20](#UVZ20),[Oli23](#Oli23)), or a diagrammatic calculus as in ([WGZ22](#WGZ22)). In this post, we turn to _skew_-monoidal categories, which no longer satisfy a coherence theorem, but nonetheless can be better understood using rewriting methods.

##Monoidal Categories

Monoidal categories are categories equipped with a "product" of objects, which is associative and unital "up to isomorphism" in a specified sense. An example is the category of sets with its cartesian product: while the sets $(X\times Y)\times Z$ and $X\times(Y\times Z)$ are not technically _equal_, they are _isomorphic_, via an isomorphism which is in some sense _canonical_. More precisely:

**Definition:**
A **monoidal category** $(\mathcal{C},\otimes,I,\alpha,\lambda,\rho)$ consists of the following data:

* A category $\mathcal{C}$
* A functor $\otimes : \mathcal{C}\times\mathcal{C}\to\mathcal{C}$
* An object $\operatorname{I}\in\mathcal{C}$
* Isomorphisms $\alpha_{x,y,z} : (x\otimes y)\otimes z \to x\otimes(y\otimes z)$ natural in $x,y,z$
* Isomorphisms $\lambda_x : \operatorname{I}\otimes x \to x$ and $\rho_x : x \to x\otimes\operatorname{I}$natural in $x$

such that the following $5$ diagrams commute:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig1.png" alt="Equations on coherences in a (skew) monoidal category"/>


(for $f:x_0\to x_1$ and $y\in\mathcal{C}$, we write $f\otimes y$ to mean $f\otimes\operatorname{id}_y: x_0\otimes y \to x_1\otimes y$, and similarly for $y\otimes f$)

**Remark:**
The above is MacLane's original definition of a monoidal category. It was later shown that the last three equations follow from the first two, but we include them since this does _not_ hold for skew-monoidal categories, as we will present below.


The coherence theorem for monoidal categories can be stated in terms of the _free_ monoidal category on a set $S$ of objects. We will not go into the formal definition, but this is the category whose objects are "formal products" of the elements of $S$ (e.g. $\operatorname{I}$, $s_0\otimes s_1$, $(s_0 \otimes s_1)\otimes (s_2\otimes s_0)$ etc.), and whose morphisms are only those built from $\alpha$, $\lambda$, $\rho$, $\operatorname{id}$, $\circ$ and $\otimes$ subject to the equations above and no other "accidental" equations. The coherence theorem is then:

**Theorem:** (MacLane's coherence theorem)
The free monoidal category on a set of objects is a preorder. That is, any two morphisms built from $\alpha$, $\lambda$, $\rho$, $\operatorname{id}$, $\circ$ and $\otimes$ between the same two objects are equal.


The above theorem is incredibly powerful, and implies that the equations listed above are strong enough to imply any other well-typed equation we could dream up in the language of monoidal categories. It was first proved in ([Mac63](#Mac63)),
but we will investigate a few modern proof strategies later on in this post. First, though, we turn to _skew_-monoidal categories.

##Skew-monoidal Categories
The above definition reflects a general pattern in higher category theory: _equalities_ get replaced by _isomorphisms_. Let us explain what we mean by this. In a monoid, there is a product operation that is associative and unital on the nose, but when we "categorify" this definition, these associativity and unitality laws are promoted to pieces of the structure in their own right: the _associator_ and _unitor_ isomorphisms. This opens up an interesting direction for generalisation: what happens if we do not require the maps $\alpha$, $\lambda$, and $\rho$ to be invertible? The definition given above is phrased so as to still make sense once we drop the invertibility constraint, and doing so we obtain the definition of **skew-monoidal categories**.

Clearly every monoidal category is a skew-monoidal category, but we can also give some examples illustrating the new freedom that dropping the invertibility restraint allows.

**Example:** (Pointed Sets)
Consider the category of sets with a chosen base point. Setting $\operatorname{I} = (1,\star)$, and $(X,x_0)\otimes(Y,y_0) = (X\sqcup Y,x_0)$, there is an obvious choice for $\alpha$, $\lambda$, and $\rho$ (exercise: find these!) defining a skew-monoidal structure. Note the asymmetry in the definition of $\otimes$: due to this, $\lambda$ is not injective and $\rho$ is not surjective! However, in this case we nevertheless have that $\alpha$ is invertible.


**Example:** ($\mathbb{N}$)
We can put a skew-monoidal structure on $\mathbb{N}$, considered as a category whose objects are non-negative integers, and where there is exactly one morphism $n\to m$ if $n\leq m$. In fact, there are countably many such structures, one for each $k\in\mathbb{N}$. We define:

* $\operatorname{I} = k$
* $m\otimes n = (m\dot - n) + k$, where $m\dot - n = \max(m-n,0)$.

$\lambda$, $\rho$, and $\alpha$ are now the assertions that, for any $x,y,z\in\mathbb{N}$:

* $(k\dot- k)+x = x \leq x$ (so $\lambda$ is invertible)
* $x \leq (x\dot- k) + k$ ($\rho$ is not in general invertible)
* $((x\dot - k) + y) \dot- k + z \leq x \dot- k + (y \dot- k) + z$


The next example requires a bit of background knowledge on Kan extensions, and can be skipped.

**Example:**
Let $J:\mathcal{C}\to\mathcal{D}$ be a functor, where $\mathcal{C}$ is small and $\mathcal{D}$ is cocomplete, so that all left Kan extensions of functors $F:\mathcal{C}\to\mathcal{D}$ along $J$ exist. We can put a skew-monoidal structure on the functor category $[\mathcal{C},\mathcal{D}]$, where $F\otimes G=\operatorname{Lan}_J F \circ G$. The monoidal unit is $J$. The universal property of left Kan extensions ensures we have natural morphisms:

* $\lambda_F : \operatorname{Lan}_J J\circ F \to F$
* $\rho_F : F \to \operatorname{Lan}_J F \circ J$
* $\alpha_{F,G,H} : \operatorname{Lan}_J(\operatorname{Lan}_J F \circ G)\circ H \to \operatorname{Lan}_J F \circ (\operatorname{Lan}_J G \circ H)$

If $J$ is fully faithful, then $\rho$ is an isomorphism. If $J$ is _dense_, meaning $\operatorname{Lan}_J J\cong \operatorname{id}$, then $\lambda$ is an isomorphism. If $\operatorname{Lan}_J F$ is _absolute_ for all $F$, meaning the Kan extension is preserved by all functors, then $\alpha$ is an isomorphism, and so in the case where all three of these properties hold, the above gives an ordinary monoidal category. However, we see that the most general case of this construction, involving only Kan extensions which are ubiquitous in category theory, naturally gives us not a monoidal category but a skew-monoidal one.


While the definitions of monoidal and skew-monoidal categories are not so different, they behave in very different ways. The most obvious question we can ask about skew-monoidal categories is whether a theorem like the coherence theorem holds. The answer turns out to be "no": for instance, in the free skew-monoidal category generated by just the object $\operatorname{I}$, the morphisms $\rho_I\circ\lambda_I$ and $\operatorname{id}_{I\otimes I}$ are not equal! If we want to understand the coherence morphisms of skew-monoidal categories, we will need a more nuanced approach.

Some modern approaches to the proof of the coherence theorem characterise coherences in monoidal categories as _normal forms_ of some rewriting system; by showing that there is exactly one normal form of each given type, the coherence theorem is proved. But this approach can also be used to study skew-monoidal categories: while the example above shows we have no hope of having unique normal forms of each type, we can still get a much better picture of the structure by implementing it as a rewriting system. It is to these rewriting systems that we now turn.

##Multicategories and Graphical Calculus
The rewriting systems we describe are all based on (skew) _multicategories_, which we will briefly introduce. The motivating idea is that while the morphisms of categories have one input and one output, the morphisms of multicategories have multiple inputs and one output. More precisely:

**Definition:**
A **multicategory** consists of:

* A class $\mathcal{C}$ of objects.
* For each pair of a (possibly empty) list $\overline{A}=A_1,\dots,A_n$ of objects and an object $B$, a class $\mathcal{C}(A_1,\dots,A_n;B)$ of multimorphisms from $\overline{A}$ to $B$.
* For each object $A$, an element $\operatorname{id}_A\in\mathcal{C}(A;A)$.
* Operations $$\circ_k:\mathcal{C}(\overline{A};C)\times\mathcal{C}(\overline{B};A_k)\to\mathcal{C}(A_1,\dots,A_{k-1},\overline{B},A_{k+1},\dots,A_n;C)$$

$\circ_k$ is to be thought of as precomposition on the $k$th input. These data are subject to equations that are analogues of associativity and unitality for ordinary categories, but these are best described using the _graphical calculus for multicategories_, which we now introduce.

Our graphical calculus is to be read top-to-bottom, and so we draw a multimorphism from $\overline{A}$ to $B$ as:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig2.png" alt="Graphical representation of a multimorphism"/>

Identity morphisms are not drawn; the following represents $\operatorname{id}_A$:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig3.png" alt="Graphical representation of an identity"/>

We denote the composite $g\circ_k f$ by:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig4.png" alt="Graphical representation of a composite"/>

The unitality and associativity laws are then immediate from the graphical calculus, for instance $(f\circ_1 g)\circ_2 h = (f\circ_2 h)\circ_1 g$ is an equation that holds in the theory of multicategories for $f : A_1,A_2 \to C$, $g : B_1\to A_1$, $h : B_2\to A_2$, and this equation holds in the graphical calculus up to planar isotopy of diagrams (or, less formally, "wiggling things around"):

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig5.png" alt="An example of an isotopy in the graphical calculus"/>


The reason for introducing multicategories is that they are intimately linked to monoidal categories. Given the structure of a monoidal category, the idea of "multiple inputs" can be encoded using the monoidal product, for instance $f:(A_1\otimes(\dots\otimes A_n)\dots)\to B$. Indeed, every monoidal category $\mathcal{C}$ can be given the structure of a multicategory $\operatorname{M}(\mathcal{C})$. The difference between the two notions is that not all multicategories arise this way. Not all are "representable", in the sense that there is a single object $A_1\otimes\dots\otimes A_n$ which encodes all the information about multimorphisms out of $A_1,\dots A_n$. To this end, we define:

**Definition:**
A **representable multicategory** is a multicategory $\mathcal{C}$ equipped with, for each list $A_1,\dots,A_n$ of objects of $\mathcal{C}$:

* An object $A_1\otimes\dots\otimes A_n$. (When $\overline{A}$ is empty, we denote this by $\operatorname{I}$)
* A multimorphism $\theta_{\overline{A}}:A_1,\dots,A_n\to A_1\otimes\dots\otimes A_n$.

Such that 
$$
-\circ_k\theta_{\overline{B}} : \mathcal{C}(A_1,\dots A_{k-1},\otimes\overline{B},A_{k+1},\dots,A_m;C)\to\mathcal{C}(A_1,\dots A_{k-1},\overline{B},A_{k+1},\dots,A_m;C)
$$
is always an isomorphism.

The above definition is justified by the following:

**Theorem:**
A multicategory $\mathcal{C}$ is isomorphic to $\operatorname{M}(\mathcal{D})$ for some monoidal category $\mathcal{D}$ if and only if it is representable.

(we have not technically defined isomorphism of multicategories: for details see Chapter 2 of ([Lei03](#Lei03))). The above theorem, together with the fact that monoidal categories are isomorphic iff the corresponding multicategories are, imply a $1-1$ correspondence between representable multicategories and monoidal categories.

Given the additional structure of representability, we can add more power to our graphical calculus. We draw $\theta_{\overline{A}}$ as:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig6.png" alt="Graphical representation of representing morphism"/>

To express that $-\circ_k\theta_{\overline{B}}$ is invertible, we represent the inverse, a map
$$\mathcal{C}(A_1,\dots A_{k-1},\overline{B},A_{k+1},\dots,A_m;C)\to\mathcal{C}(A_1,\dots A_{k-1},\otimes\overline{B},A_{k+1},\dots,A_m;C)$$
as:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig7.png" alt="Graphical representation of inverse to composition with representing morphism"/>


In the case where $\overline{B}$ is empty, we write the above as:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig8.png" alt="Graphical representation of the special case of an empty domain"/>

The above is subject to the equations expressing invertibility:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig9.png" alt="Equational theory on the graphical calculus"/>

We now have a diagrammatic equational theory for represntable multicategories, and hence monoidal categories. Thus, all the coherences of a monoidal category should be expressible diagrammatically, along with the equations between them. For instance, the following represent the associator, left and right unitors:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig10.png" alt="Graphical representation of the associator and unitors"/>

And their inverses as the vertically reflected versions:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig11.png" alt="Graphical representation of the inverse associator and unitors"/>

And the following is a derivation of $\lambda_{\operatorname{I}} \circ\rho_{\operatorname{I}} = \operatorname{id}_{\operatorname{I}}$, for instance:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig12.png" alt="An example derivation in the graphical calculus"/>

In fact, the above graphical calculus is exactly the same as that described in ([WGZ22](#WGZ22)), although the way the authors arrive at it is completely different, having nothing to do with multicategories. Instead, they consider the _strictification_ of a monoidal category. Moreover, they show using graphical methods that every diagram of the same type is equal, proving theorem the coherence theorem.

The strictification theorem for monoidal categories doesn't have an analogue for skew-monoidal categories, and so the approach taken in ([WGZ22](#WGZ22)) is not suitable to be adapted to this case. However, there _is_ an analogue of multicategories, _skew multicategories_, defined in ([BL18](#BL18)), to which we now turn.

##Skew Multicategories
The idea of skew multicategories is that there are two kinds of multimorphisms, "tight" and "loose", which behave differently with respect to composition. Loose morphisms behave like ordinary multimorphisms in a multicategory. Tight morphisms, on the other hand, can only be composed together on the leftmost input, via $\circ_1$, and this is what leads to the asymmetry.

**Definition:**
A **skew multicategory** consists of:

* A class $\mathcal{C}$ of objects.
* For each (possibly empty) list $\overline{A}$ of objects, and object $B$, a class $\mathcal{C}_l(\overline{A};B)$ of **loose** multimorphisms.
* For each _nonempty_ list $\overline{A}$ of objects, and object $B$, a class $\mathcal{C}_t(\overline{A};B)$ of **tight** multimorphisms.
* Maps $\gamma : \mathcal{C}_t(\overline{A};B) \to \mathcal{C}_l(\overline{A};B)$, allowing tight multimorphisms to be viewed as loose ones.
* Tight identity multimorphisms $\operatorname{id}_A\in\mathcal{C}_t(A;A)$.
* Composition operations:
$$\begin{aligned}        &\circ_k:\mathcal{C}_l(\overline{A};C)\times\mathcal{C}_l(\overline{B};A_k)\to\mathcal{C}_l(A_1,\dots,A_{k-1},\overline{B},A_{k+1},\dots,A_n;C) \\
&\circ_1:\mathcal{C}_t(\overline{A};C)\times\mathcal{C}_t(\overline{B};A_1)\to\mathcal{C}_t(\overline{B},A_2,\dots,A_n;C)\\
&\circ_k:\mathcal{C}_t(\overline{A};C)\times\mathcal{C}_l(\overline{B};A_k)\to\mathcal{C}_t(A_1,\dots,A_{k-1},\overline{B},A_{k+1},\dots,A_n;C)\quad \text{ (for }\,k\gt 1\text{)}
\end{aligned}$$

These are subject to equations, which we once again postpone until we set up our graphical calculus.

**Warning:**
The graphical calculus for skew multicategories presented below, and representable skew multicategories presented later, is ongoing work, and a formal correspondence between the calculus and the theory of (left representable) skew multicategories is yet to be proven. The calculus can thus for the moment be taken as a pedagogical tool for the exposition of skew multicategories, and a formal proof of its correctness is left as future work.

We graphically depict tight versus loose multimorphisms using two colours:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig13.png" alt="Graphical representation tight and loose multimorphisms"/>


The placement of the colours ensures that the composition operations behave as above: for instance, the following ways of composing tight with tight multimorphisms, and tight with loose multimorphisms, yield tight multimorphisms:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig14.png" alt="Graphical representation of composition in a skew multicategory"/>

Identities are depicted similarly:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig15.png" alt="Graphical representation of identities in a skew multicategory"/>

While the map $\gamma$ is represented as:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig16.png" alt="Graphical representation of the map gamma"/>

In addition to the equations holding by vitue of isotopy of diagrams, we also impose:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig17.png" alt="Equational theory on diagrams in the skew graphical calculus"/>

Once again, there is a relationship between skew-monoidal categories and skew multicategories. Given a skew-monoidal category $\mathcal{C}$, we define a skew-monoidal structure $\operatorname{S}(\mathcal{C})$ with:

* $\operatorname{S}(\mathcal{C})_t(A_1,\dots,A_n;B)=\mathcal{C}((A_1\otimes(\dots A_n)\dots),B)$.
* $\operatorname{S}(\mathcal{C})_l(A_1,\dots,A_n;B)=\mathcal{C}((\operatorname{I}\otimes(A_1\otimes(\dots A_n)\dots),B)$.
* $\gamma$ is defined by precomposition with $\lambda$.

The authors check that this gives a skew multicategory in ([BL18](#BL18)).

Once again, the skew multicategories that arise from skew-monoidal categories in the above way can be characterised via a representability property:

**Definition:**
A skew multicategory $\mathcal{C}$ is **left representable** if there is:

* An object $\operatorname{I}$, together with a loose morphism $\theta_\varnothing\in\mathcal{C}_l(\ ;\operatorname{I})$
* For every list $A_1\dots A_n$ of objects, an object $A_1\otimes\dots\otimes A_n$ together with a tight multimorphism $\theta_{\overline{A}}\in\mathcal{C}_t(A_1,\dots,A_n;A_1\otimes\dots\otimes A_n)$
such that the maps:
$$\begin{aligned}
-\circ_1\theta_{\overline{A}} &: \mathcal{C}_t(\otimes \overline{A},\overline{B};C)\to\mathcal{C}_t(\overline{A},\overline{B};C) \\
\gamma(-)\circ_1\theta_\varnothing &: \mathcal{C}_t(I,\overline{A};B)\to\mathcal{C}_l(\overline{A};B)
\end{aligned}$$
are always invertible.

Once again, we depict $\theta_\varnothing$ and $\theta_{\overline{A}}$ as:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig18.png" alt="Graphical representation of representing morphisms in the skew graphical calculus"/>

And the inverses to $-\circ_1\theta_{\overline{A}}$ and $\gamma(-)\circ_1\theta_\varnothing$ as:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig19.png" alt="Graphical representation of inverse to composition with representing morphisms in the skew graphical calculus"/>

imposing the equations:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig20.png" alt="Equational theory on skew graphical calculus pertaining to representing morphisms"/>


And we have the following:

**Theorem:**
A skew multicategory $\mathcal{C}$ is isomorphic to $\operatorname{S}(\mathcal{D})$ for some skew-monoidal category $\mathcal{D}$ if and only if it is left representable.

implying $1-1$ correspondence between skew-monoidal categories and left representable skew multicategories.

As a sanity check, we can construct the coherences $\alpha$, $\lambda$, and $\rho$ in our graphical calculus as:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig21.png" alt="Graphical representation of the skew associator and unitors"/>

but now we cannot construct any diagrams of the opposite type! 

Modulo the warning given above, left representable skew multicategories and their graphical calculus now give us a way to understand and manipulate coherences in a free skew-monoidal category. While we no longer have uniqueness of diagrams of the same type, we now can get some visual intuition for why, for instance, $\rho_I\circ\lambda_I\neq\operatorname{id}_{I\otimes I}$:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig22.png" alt="Graphical representation of a morphism not equal to the identity"/>

##Sequent Calculus for (Skew) Multicategories
While diagrammatic calculi like those presented above make reasoning intuitive and visual, the formal properties of such rewrite systems can be hard to rigorously understand and implement. A step towards an even more operational understanding of coherences in (skew-)monoidal categories is implementing their theory as a deductive system akin to those found in formal logic.

We present here the sequent calculus developed in ([UVZ20](#UVZ20)) for (skew-)monoidal categories, which itself is inspired by the work of ([BL18](#BL18)), and can be seen more explicitly as a calculus for left representable skew multicategories. First, we treat the ordinary (non-skew) case:

**Definition:** (Sequent Calculus for Multicategories)
Fix an alphabet $\mathcal{A}$ of _object variables_.
The sequent calculus for multicategories has, as its judgements, sequents of the form $A_1,\dots,A_n\to B$, where $A_1,\dots,A_n,B\in\mathcal{A}$. We use greek metavariables $\Gamma,\Delta,$ etc. for the lists of objects appearing on the left hand side. Its derivation rules are:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig23.png" alt="Rules for the sequent calculus of multicategories"/>

We identify derivations of the sequent calculus with morphisms in the free multicategory on $\mathcal{A}$. The above rules clearly correspond to the existence of identity morphisms, and composition in a multicategory. We must, however, impose associativity and unitality equations, for instance:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig24.png" alt="Example of an equation imposed on the sequent calculus of multicategories"/>

We omit the full rules: they can be easily derived from the axioms of a multicategory. 


To capture the morphisms of a free representable multicategory, we must increase the expressive power. "Objects" appearing on each side of the sequent will no longer be simple variables, but now bracketed lists of variables delimited by $\otimes$, for instance $A\otimes(B\otimes C)$, or $A\otimes \operatorname{I}\otimes A$, writing $\operatorname{I}$for the empty list. We add the following four rules:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig25.png" alt="Additional rules for the sequent calculus of representable multicategories"/>

These can be interpreted as, respectively:

* $\otimes$R: the existence of the maps $\theta_{\overline{A}}$, coupled with composition.
* $\otimes$L: the inverses to $-\circ_k\theta_{\overline{A}}$
* $\operatorname{I}$R: the map $\theta_\varnothing :  \ \to \operatorname{I}$
* $\operatorname{I}$L: the inverse to $-\circ_k\theta_\varnothing$


and as such they are subject to more equations, similarly derived from the axioms of a representable multicategory. We have:

**Theorem:**
There is a bijection between derivations of the above sequent calculus, up to the equational theory hinted at above, and the morphisms of a free representable multicategory (and hence a free monoidal category).


Moreover, these equations can be given a direction such that they implement a confluent rewriting system with unique normal forms of each type, giving another proof of theorem the coherence theorem.

The authors of ([UVZ20](#UVZ20)) adapt the above sequent calculus to work for skew multicategories as follows. To capture the asymmetry inherent in the definition, judgements are now of the form $\operatorname{S} \operatorname{|} \Gamma \to A$, where $\Gamma$ is a list of objects as before, $A$ is an object, and $\operatorname{S}$ is a "stoup": a new privileged first position which can either be a single object, or empty (written $-\operatorname{|}\Gamma\to A$ in the second case). We will identify tight morphisms with derivations of sequents with nonempty stoup, and loose morphisms with derivations of sequents with empty stoup. We define:

**Definition:** (Sequent Calculus for Skew Multicategories)
We replace the rules of the sequent calculus for multicategories with the following:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig26.png" alt="Rules for the sequent calculus of skew multicategories"/>

which correspond, respectively, to:

* (tight) identity morphisms,
* the map $\gamma$,
* composition $\circ_1$
* composition $\circ_k$

These are again subject to equations which are listed in full in ([UVZ20](#UVZ20)), based on the axioms of skew multicategories. For instance, the equation expressing compatibility of $\gamma$ with composition becomes: 
<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig27.png" alt="Example of an equation imposed on the sequent calculus of skew multicategories"/>

To augment this into a sequent calculus for left representable skew multicategories, we once again add four new rules, which now make key use of the stoup:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig28.png" alt="Additional rules if the sequent calculus for left-representable skew multicategories"/>

These correspond to:

* Composition with the maps $\circ_k$
* The inverse to $-\circ_1\theta_{\overline{A}}$
* The map $\theta_\varnothing$
* The inverse to $\gamma(-)\circ_1\theta_\varnothing$

And are subject to rules listed in ([UVZ20](#UVZ20)). This finally gives us:

**Theorem:**
There is a bijection between derivations of $A_1\operatorname{|} A_2,\dots A_n \to B$ of the above sequent
calculus, up to the equational theory given in ([UVZ20](#UVZ20)), and tight morphisms $A_1,\dots, A_n\to B$ of a
free left representable skew multicategory. In the case where $n=1$, we have that derivations of $A\operatorname{|}\to B$ up to the equational theory are in bijection with morphisms from $A$ to $B$ in a free skew-monoidal category.


For instance, a derivation corresponding to the associator is:

<img src="https://raw.githubusercontent.com/appliedcategorytheory/appliedcategorytheory.github.io/master/images/2024-blog-posts/4A/fig29.png" alt="A derivation corresponding to the skew associator"/>

Moreover, the authors show that these equational rules can be directed, giving a confluent terminating rewriting system, and thus equality of coherences in a skew-monoidal category can be decided using the above logical system. 

What's more, we may be interested in asking whether there exists a coherence morphism between two objects, and enumerating such morphisms. The authors in ([UVZ20](#UVZ20)) also provide an algorithm to do this, by adapting the above sequent calculus to a so-called "focused" version. 

##Conclusion and future work
While the coherence theorem of MacLane no longer holds for skew-monoidal categories, rewriting approaches like those investigated above can provide a way to get to grips with these complex structures. There is much more room for investigation of related structures, such as skew-closed categories, and braided skew-monoidal categories, where the above approaches could also be fruitful. In addition, there is future work in a more rigorous analysis of the graphical calculus presented above for skew-monoidal categories.

##References

* {#UVZ20} [[Tarmo Uustalu, Niccolò Veltri, Noam Zeiberger]], _The Sequent
Calculus of Skew Monoidal Categories_ 2020 ([arXiv:2003.05213](https://arxiv.org/abs/2003.05213))

* {#Oli23 [[Federico Olimpieri]], _Coherence by Normalization for Linear Multicategorical Structures_ 2023 ([arXiv:2302.05755](https://arxiv.org/abs/2302.05755))

* {#WGZ22} [[Paul Wilson, Dan Ghica, and Fabio Zanasi]], _String diagrams for non-
strict monoidal categories_ 2022 ([arXiv:2201.11738](https://arxiv.org/abs/2201.11738))

* {#Mac63} [[Saunders Maclane]], _“Natural Associativity and Commutativity_ 1963 ([pdf](https://www.mscs.dal.ca/~selinger/papers/papers/graphical-bib/public/MacLane-natural-associativity-and-commutativity-1963.pdf))

* {#Lei03} [[Tom Leinster]], _Higher Operads, Higher Categories_ 2003 ([arXiv](https://arxiv.org/abs/math/0305049))

* {#BL18} [[John Bourke and Stephen Lack]], _Skew monoidal categories and skew
multicategories_ 2017 ([arXiv:1708.06088](https://arxiv.org/abs/1708.06088))
