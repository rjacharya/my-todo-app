import { type ClientSchema, a, defineData } from "@aws-amplify/data";

  const schema = a.schema({
    Todo: a
      .model({
        title: a.string().required(),
        isComplete: a.boolean().default(false),
      })
      .authorization((allow) => [allow.public()]),
  });

  export type Schema = ClientSchema<typeof schema>;

  export const data = defineData({ schema });
