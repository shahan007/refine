import nock from "nock";

/**
 * Hasura default 'snake_case' naming convention
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n      insert_posts (objects: $objects) {\n    returning { id, title, content, category { id } }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403a58fc16ac4300c447f45f8bc2ed9aced247bdb437fa197528aec285b83e3646db9b42cf9f73a85427bee49236906e6ddc5888ce27c173e664afcba2e99f3be27e292a28f57016778aeff519c454f64c81cadecd56990aa6db51cac5572d4a4ba7ed2b6411207c19e0355fb85226184123879e729435c22046f292d903d03cec4b052081499f2adec59b7541db9a69f28b3b7259419de4b580b2313645c3d45c0e4cac3eeaeb7eb923ebf09f686a763e70835c989a69354bdee65dfa8aad46048bb6ed268c5b61de087687244bdd152ab464965472371402b6ddb352d8d1a3b637e113db2c719d847e7c71219e8034ae5288e9704539db570fe437109fe566a267afb069490ff53fb65dbb62fba60f565b3010000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:48:24 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "50b633a20c123ace01af138a83c10287",
            "Content-Encoding",
            "gzip",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "77235a904c7abbfd-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [posts_insert_input!]!) {\n      insert_posts (objects: $objects) {\n    returning { id }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004032dca390e02310c40d1ab44ae71916db25c052164271e344d4049a846b93b20517ebd7f42a549904f38da903eefafe798e3d75de6bbb7a33d406575fd7a850c9a53a92e38944a065da80ea9f8889103fb4449ef7a877551ff7d3326e92216bdc488ce322349885878f3b5b0765618d66dadf501d8ba1e9188000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:48:45 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "8e8b2bb5e88f505bae9b9a798d6fbbba",
            "Content-Encoding",
            "gzip",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "77235b13181b9217-FRA",
        ],
    );

/**
 * Graphql default 'camelCase' naming convention
 */

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [PostsInsertInput!]!) {\n      insertPosts (objects: $objects) {\n    returning { id, title, content, category { id } }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000013a58f314fc3301085ffcac9738dd2d4769c6e1dd8995810c3d9b9144baed3da6704aaf2df7190906066ba7777ef49efbb8b0919c5f12e422a94f969295cb63513d79c423a0b38c24b7b4fe2282c9121b377d2aac32855df6b393aa7e4a4490d76d6ae43123bc1812335fb891261821a39071fa8405a12c4e0282f5002035e88e14a3152622ab7ba65fdd274e2967ea6c2c1d5582ff05ee3b5323241c16ba004987d7dd8dced765ef2e737c0d6f0b01f3ca12639d37c90ca6a2b6da79a52a321ed8759a313ebba831fa2d91359a3a5569d92ca4d46e2884eba7ee87a9a340ec6fc227ae48017e0907c986a62a00fa88da37a5e32cc6db6c2e50fc529865b6d9914dc1b5046fe4fedd7755dbf00f7c15587b2010000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:48:24 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "50b633a20c123ace01af138a83c10287",
            "Content-Encoding",
            "gzip",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "77235a904c7abbfd-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($objects: [PostsInsertInput!]!) {\n      insertPosts (objects: $objects) {\n    returning { id }\n  }\n    }",
        variables: {
            objects: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000000132dca390e03210c40d1ab20d771c1362ca7483f4a6183279a864840aa11774f22a5fc7aff824a93205f70b6217dde5f638e5f7699efdecef60495d5fee50a1934a7525d7028950cba501d52f1112307f689923ef401eba6fefb664cd2452c7a89119d65469210b1f0e66b61edac30acc75aeb03f7c1356c87000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 11:48:45 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "8e8b2bb5e88f505bae9b9a798d6fbbba",
            "Content-Encoding",
            "gzip",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "77235b13181b9217-FRA",
        ],
    );
