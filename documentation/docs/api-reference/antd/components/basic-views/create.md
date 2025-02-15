---
id: create
title: Create
swizzle: true
---

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/create
interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

// visible-block-start
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

const PostCreate: React.FC = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { Form, Input, Select, useForm, useSelect, CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create title="Custom Title">
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/api-reference/antd/components/buttons/save.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { Form, Input, Select, useForm, useSelect, CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create saveButtonProps={{ size: "small" }}>
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `resource`

The `<Create>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Create>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import { Refine } from "@refinedev/core";

// visible-block-start
import { Create } from "@refinedev/antd";

const MyComponent: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create resource="posts">
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

const App: React.FC = () => {
    return (
        <RefineAntdDemo
            legacyRouterProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <MyComponent />,
                        path: "/custom",
                    },
                ],
                // highlight-end
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};

render(<App />);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/docs/api-reference/core/components/refine-config#identifier)

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;
import { Button } from "antd";

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    const BackButton = () => <Button>←</Button>;
    return (
        /* highlight-next-line */
        <Create goBack={<BackButton />}>
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `isLoading`

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create isLoading={true}>
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/antd` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/antd/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create, Breadcrumb } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            breadcrumb={
                <div
                    style={{
                        padding: "3px 6px",
                        border: "2px dashed cornflowerblue",
                    }}
                >
                    <Breadcrumb />
                </div>
            }
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property. For `@refinedev/antd` wrapper elements are simple `<div/>`s and `wrapperProps` can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            wrapperProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `headerProps`

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

[Refer to the `PageHeader` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/page-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            headerProps={{
                subTitle: "This is a subtitle",
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `contentProps`

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

[Refer to the `Card` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            contentProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            headerButtonProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
            headerButtons={<Button type="primary">Custom Button</Button>}
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `footerButtons`

By default, the `<Create/>` component has a [`<SaveButton>`][save-button] at the header.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] component.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, SaveButton } from "@refinedev/antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            footerButtons={({ saveButtonProps }) => (
                <>
                    <SaveButton
                        {...saveButtonProps}
                        type="primary"
                        style={{ marginRight: 8 }}
                    >
                        Save
                    </SaveButton>
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};

// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-start
            footerButtonProps={{
                style: {
                    // hide-start
                    float: "right",
                    marginRight: 24,
                    // hide-end
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Create>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

## API Reference

### Props

<PropsTable module="@refinedev/antd/Create" goBack-default="`<ArrowLeft />`" headerProps-type="[`PageHeaderProps`](https://procomponents.ant.design/en-US/components/page-header)" />

[breadcrumb-component]: /api-reference/antd/components/breadcrumb.md
[save-button]: /docs/api-reference/antd/components/buttons/save-button/
