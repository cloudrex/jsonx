export type Constraint = (propName: string, value: any) => boolean;

export enum Type {
    String = "string",
    Object = "object",
    Number = "number",
    Bool = "boolean"
}

/**
 * Apply different constraints to class properties.
 */
export default abstract class x {
    public static type(type: Type): Constraint {
        return (propName, value) => {
            return typeof value === type;
        };
    }

    public static string(): Constraint {
        return x.type(Type.String);
    }

    public static object(): Constraint {
        return x.type(Type.Object);
    }

    public static integer(): Constraint {
        return x.type(Type.Number);
    }

    public static bool(): Constraint {
        return x.type(Type.Bool);
    }

    public static unsigned(): Constraint {
        return (propName, value) => {
            return x.integer()(propName, value) && parseInt(value) >= 0;
        };
    }
}
