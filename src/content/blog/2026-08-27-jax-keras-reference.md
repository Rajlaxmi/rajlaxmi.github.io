---
title: JAX, Keras, and NumPy Reference Sheet
slug: jax-keras-reference
date: 2026-08-27
category: Reference
excerpt: A quick lookup cheatsheet for JAX and Keras 3 — array ops, functional transforms, explicit PRNG keys, and building/training a model, runnable on a free Colab TPU.
tags: [jax, keras, numpy, python, reference, cheatsheet, tpu]
draft: false
authorship: ai-coauthored
---

Companion to the [PyTorch, NumPy, and Python reference sheet](/#/blog/pytorch-numpy-python-reference) — this one covers JAX and Keras 3 specifically, including the parts that don't map cleanly onto NumPy/PyTorch at all (explicit PRNG keys, immutable arrays, functional transforms).

[Open the runnable version in Google Colab](https://colab.research.google.com/github/Rajlaxmi/rajlaxmi.github.io/blob/master/notebooks/jax-keras-tpu-reference.ipynb) — configured to run on a free Colab TPU, no local setup required.

Official references: [JAX documentation](https://docs.jax.dev/en/latest/) · [Keras documentation](https://keras.io/getting_started/) · [NumPy quickstart](https://numpy.org/doc/stable/user/quickstart.html)

### Creating Arrays

| Operation | NumPy | JAX | Keras (`keras.ops`) |
| --- | --- | --- | --- |
| From a list | `np.array([1, 2, 3])` | `jnp.array([1, 2, 3])` | `keras.ops.array([1, 2, 3])` |
| Zeros / ones | `np.zeros((2, 3))` / `np.ones((2, 3))` | `jnp.zeros((2, 3))` / `jnp.ones((2, 3))` | `keras.ops.zeros((2, 3))` / `keras.ops.ones((2, 3))` |
| Identity matrix | `np.eye(3)` | `jnp.eye(3)` | `keras.ops.eye(3)` |
| Range | `np.arange(0, 10, 2)` | `jnp.arange(0, 10, 2)` | `keras.ops.arange(0, 10, 2)` |
| Evenly spaced | `np.linspace(0, 1, 5)` | `jnp.linspace(0, 1, 5)` | `keras.ops.linspace(0, 1, 5)` |
| Same shape as another | `np.zeros_like(a)` | `jnp.zeros_like(a)` | `keras.ops.zeros_like(x)` |
| Uninitialized | `np.empty((2, 3))` | — (no meaningful uninitialized alloc; use `jnp.zeros`) | `keras.ops.empty((2, 3))` |

### Shape and Indexing

| Operation | NumPy | JAX | Keras (`keras.ops`) |
| --- | --- | --- | --- |
| Shape / ndim | `a.shape`, `a.ndim` | `x.shape`, `x.ndim` | `x.shape`, `x.ndim` |
| Basic slice | `a[1:3, :2]` | `x[1:3, :2]` | `x[1:3, :2]` |
| Boolean mask | `a[a > 0]` | `x[x > 0]` | `x[x > 0]` |
| Add a new axis | `a[:, None]` or `np.expand_dims(a, 1)` | `x[:, None]` or `jnp.expand_dims(x, 1)` | `keras.ops.expand_dims(x, 1)` |
| In-place update at an index | `a[0] = 99` | `x = x.at[0].set(99)` — see below | backend-dependent |

**JAX arrays are immutable.** `a[0] = 99` raises an error — there's no in-place indexed assignment. Instead, `x.at[idx].set(value)` (also `.add()`, `.multiply()`, `.max()`, ...) returns a *new* array with that update applied; `x` itself is untouched. Inside a `jax.jit`-compiled function, XLA can usually turn this back into a true in-place buffer update, so it's not as wasteful as it looks.

### Broadcasting

Same rule as NumPy, aligned from the trailing dimension: two axes are compatible if they're equal, or one of them is `1`.

```python
x1 = jnp.arange(3).reshape(3, 1)   # shape (3, 1)
x2 = jnp.arange(4).reshape(1, 4)   # shape (1, 4)
x1 + x2                             # shape (3, 4)
```

### Math and Reductions

| Operation | NumPy | JAX | Keras (`keras.ops`) |
| --- | --- | --- | --- |
| Elementwise add/mul | `a + b`, `a * b` | `x1 + x2`, `x1 * x2` | `x1 + x2`, `x1 * x2` |
| Matrix multiply | `a @ b` or `np.matmul(a, b)` | `x1 @ x2` or `jnp.matmul(x1, x2)` | `keras.ops.matmul(x1, x2)` |
| Sum / mean / std | `a.sum()`, `a.mean()`, `a.std()` | `x.sum()`, `x.mean()`, `x.std()` | `keras.ops.sum(x)`, `keras.ops.mean(x)`, `keras.ops.std(x)` |
| Max / argmax | `a.max()`, `a.argmax()` | `x.max()`, `x.argmax()` | `keras.ops.max(x)`, `keras.ops.argmax(x)` |
| Clip | `np.clip(a, 0, 1)` | `jnp.clip(x, 0, 1)` | `keras.ops.clip(x, 0, 1)` |
| Cumulative sum | `np.cumsum(a)` | `jnp.cumsum(x, axis=0)` | `keras.ops.cumsum(x, axis=0)` |
| Sort | `np.sort(a)` | `jnp.sort(x)` | `keras.ops.sort(x)` |
| Exp / log / sqrt | `np.exp(a)`, `np.log(a)`, `np.sqrt(a)` | `jnp.exp(x)`, `jnp.log(x)`, `jnp.sqrt(x)` | `keras.ops.exp(x)`, `keras.ops.log(x)`, `keras.ops.sqrt(x)` |
| Einstein summation | `np.einsum('ij,jk->ik', a, b)` | `jnp.einsum('ij,jk->ik', x1, x2)` | `keras.ops.einsum('ij,jk->ik', x1, x2)` |

Both `jnp.max`/`jnp.sort` and their Keras equivalents follow NumPy's convention of returning values only — use `jnp.argmax`/`jnp.argsort` (or the Keras equivalents) separately for indices, unlike PyTorch's `.max(dim=...)`, which returns a `(values, indices)` tuple.

### Reshaping and Combining

| Operation | NumPy | JAX | Keras (`keras.ops`) |
| --- | --- | --- | --- |
| Reshape | `a.reshape(2, 6)` | `x.reshape(2, 6)` | `keras.ops.reshape(x, (2, 6))` |
| Transpose (2D) | `a.T` | `x.T` | `keras.ops.transpose(x)` |
| Concatenate | `np.concatenate([a, b], axis=0)` | `jnp.concatenate([x1, x2], axis=0)` | `keras.ops.concatenate([x1, x2], axis=0)` |
| Stack (new axis) | `np.stack([a, b], axis=0)` | `jnp.stack([x1, x2], axis=0)` | `keras.ops.stack([x1, x2], axis=0)` |
| Split | `np.split(a, 3, axis=0)` | `jnp.split(x, 3, axis=0)` | `keras.ops.split(x, 3, axis=0)` |

This distinction doesn't come up for JAX or Keras the way it does for PyTorch's `view` vs `reshape` — there's no "shares storage with the original" concept to worry about once arrays are immutable.

### Linear Algebra

| Operation | NumPy | JAX | Keras (`keras.ops`) |
| --- | --- | --- | --- |
| Matrix inverse | `np.linalg.inv(a)` | `jnp.linalg.inv(x)` | `keras.ops.inv(x)` |
| Determinant | `np.linalg.det(a)` | `jnp.linalg.det(x)` | `keras.ops.det(x)` |
| Eigenvalues | `np.linalg.eig(a)` | `jnp.linalg.eig(x)` | `keras.ops.eig(x)` |
| SVD | `np.linalg.svd(a)` | `jnp.linalg.svd(x)` | `keras.ops.svd(x)` |
| Norm | `np.linalg.norm(a)` | `jnp.linalg.norm(x)` | `keras.ops.norm(x)` |
| Solve `Ax = b` | `np.linalg.solve(A, b)` | `jnp.linalg.solve(A, b)` | `keras.ops.solve(A, b)` |

### Random Numbers

| Operation | NumPy | JAX | Keras |
| --- | --- | --- | --- |
| Seed / key | `np.random.seed(0)` | `key = jax.random.key(0)` | `seed=0` passed per-call |
| Uniform `[0, 1)` | `np.random.rand(2, 3)` | `jax.random.uniform(key, (2, 3))` | `keras.random.uniform((2, 3), seed=0)` |
| Standard normal | `np.random.randn(2, 3)` | `jax.random.normal(key, (2, 3))` | `keras.random.normal((2, 3), seed=0)` |
| Random ints | `np.random.randint(0, 10, (2, 3))` | `jax.random.randint(key, (2, 3), 0, 10)` | `keras.random.randint((2, 3), 0, 10, seed=0)` |

JAX has no global random state at all — every call takes an explicit key, and reusing a key deterministically reproduces the exact same values. You never reuse a key for two different draws; instead you split off fresh subkeys:

```python
key = jax.random.key(0)
key, subkey = jax.random.split(key)
x = jax.random.normal(subkey, (2, 3))
```

Keras's `keras.random` API is stateless in a similar spirit (same `seed` in → same values out), but manages the key/counter bookkeeping for you via an internal `SeedGenerator` rather than requiring you to split keys by hand.

### Dtypes and Devices

| Operation | NumPy | JAX | Keras |
| --- | --- | --- | --- |
| Check dtype | `a.dtype` | `x.dtype` | `x.dtype` |
| Cast | `a.astype(np.float32)` | `x.astype(jnp.float32)` | `keras.ops.cast(x, "float32")` |
| Default float | `float64` | `float32` (`float64` needs `jax.config.update("jax_enable_x64", True)`) | backend-dependent (`float32` typically) |
| Move to a device | — | `jax.device_put(x, device)` — arrays place onto the default device automatically otherwise | handled by the active backend |
| Check device | — | `x.device` | backend-dependent |

The default-dtype mismatch trips people up constantly: `np.array([1.0, 2.0])` is `float64`, but `jnp.array([1.0, 2.0])` is `float32`. Converting a NumPy `float64` array straight into a model expecting `float32` weights is a common source of a silent dtype-promotion slowdown.

### NumPy ⇄ JAX Interop

```python
# NumPy -> JAX (always copies — JAX arrays are immutable, so there's no memory-sharing story)
x = jnp.array(a)

# JAX -> NumPy
a = jax.device_get(x)  # or np.asarray(x)
```

### JAX: Functional Transforms

JAX takes a completely different shape to autograd than PyTorch: transforms are plain functions that take a function and return a new one — there's no `.backward()` call and no persistent graph object to manage.

```python
import jax
import jax.numpy as jnp

def f(x):
    return jnp.sum(x ** 2)

grad_f = jax.grad(f)      # a new function computing df/dx
fast_f = jax.jit(f)       # f, compiled with XLA
batched_f = jax.vmap(f)   # f, vectorized over a leading batch axis

x = jnp.array([1.0, 2.0, 3.0])
grad_f(x)                  # Array([2., 4., 6.])
fast_f(x)                  # 14.0, compiled
batched_f(jnp.stack([x, x]))  # f applied independently to each row
```

They also compose freely — `jax.jit(jax.grad(f))` is completely ordinary JAX code, not a special case. This is the core reason JAX code often reads as "more functional" than PyTorch: state (parameters, RNG keys) is passed explicitly as arguments rather than living on `self`.

### Keras 3: Building and Training a Model

```python
import os
os.environ["KERAS_BACKEND"] = "jax"  # must be set *before* `import keras`

import keras
from keras import layers

model = keras.Sequential([
    layers.Input(shape=(784,)),
    layers.Dense(128, activation="relu"),
    layers.Dense(10),
])

model.compile(
    optimizer="adam",
    loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=["accuracy"],
)

model.fit(x_train, y_train, batch_size=32, epochs=5, validation_split=0.1)
```

The backend is chosen once, via `KERAS_BACKEND` (or `~/.keras/keras.json`), and can't be changed after `keras` is imported — set the environment variable, *then* import, in that order, every run. The rest of the API — `Sequential`/functional model building, `.compile()`, `.fit()` — stays identical whether the backend underneath is JAX, TensorFlow, or PyTorch, which is the actual point of Keras 3's multi-backend design. On a TPU runtime (like the Colab notebook linked above), the JAX backend picks up the TPU automatically — no extra configuration beyond setting `KERAS_BACKEND`.
