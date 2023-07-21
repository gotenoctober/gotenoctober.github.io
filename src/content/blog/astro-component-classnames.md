---
title: How to combine class attributes in Astro (the right way)
pubDate: 2023-07-20T18:19:55Z
---

One of the great features of [Astro](https://astro.build) are [Components](https://docs.astro.build/en/core-concepts/astro-components/): lightweight pieces of reusable site content. Other frameworks call these partials or fragments. One example of a component on this very site is `<ContactButton />` which you can see on the sidebar (or menu on mobile).

While building `<ContactButton />`, I wanted the ability to alter its appearance directly via `class` props and have them merged with the component's built-in `class`. Unfortunately the Astro Component docs don't make it obvious how to do this but I feel like I landed on the "right way" through a little bit of trial and error.

Consider this basic start to `<ContactButton />`:

```astro
---
import { CONTACT_URL } from "../config";

interface Props {
  text?: string;
}

const { text = "Get in touch" } = Astro.props;
---

<a class="btn btn-primary" href={CONTACT_URL}>{text}</a>
```

Our only prop is the button text so usage is pretty straightforward:

```astro
---
import ContactButton from "../components/ContactButton.astro";
---

<ContactButton text="Click me!" />
```

Now let's experiment and see what happens when we provide `class` to our component:

```astro
<ContactButton class="btn-lg" text="Click me!" />
```

Here's the result:

```html
<a class="btn btn-primary" href="https://example.com/contact">Click me!</a>
```

As you can see our `class` prop was ignored entirely so it looks like we'll have to manually merge `class` values within the component rendering script. Our first instinct may be to just use string concatenation to accomplish this:

```astro
---
import { CONTACT_URL } from "../config";

interface Props {
  text?: string;
  class?: string;
}

const { text = "Get in touch", class: className } = Astro.props;
---

<a class=`btn btn-primary ${className}` href={CONTACT_URL}>{text}</a>
```

That _works_ but presents several problems, including the risk of inadvertently having duplicate class names in our final rendering. Thankfully Astro provides a better way to handle this via the [`class:list`](https://docs.astro.build/en/reference/directives-reference/#classlist) directive. Let's use this to refactor:

```astro
---
//...
---

<a class:list={["btn", "btn-primary", className]} href={CONTACT_URL}>{text}</a>
```

The `class:list` directive gives us a result with everything we want: automatic de-duplication of class names as well as more flexibility over our input values. We can pass classes as a string, Array, or Set. We can even pass an object of class names as keys and use the object's values to dynamically include or exclude certain classes.
