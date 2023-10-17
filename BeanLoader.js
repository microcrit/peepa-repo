/*
Replace the default Console loader with Ben Stewart.
SYNTAX:

AST tree:
defaultExport: node.argument = return statement JSX element, choldren[1] = first child in JSX fragment, so on... log AST tree (element) for more info
    returns: {
        element: patched AST node (parent of declaration, modification of second in destructure)
    }
everythingExport: FULL AST TREE: Access default (BeanLoader) via element.program.body.find((node) => node.type === 'ExportDefaultDeclaration'), then modify the node. log AST for more info.
    returns: {
        element: patched AST node (modification of second in destructure),
        rules (NOT IMPLEMENTED): [
            "22:45(code)42:10 code{<h1>Hello</h1>}" for example, with 22:45 as line:character and inserted content as (variable), defined after.
        ]
    }
*/

export default function BeanLoader({ file, element }) {
    if (file.endsWith('.jsx') && file === "frontend/src/components/Loader.jsx") {
        return {
            condition: true,
            defaultExport: ({ file, element }) => {
                let node = element.declaration.body.body[1];
                let img = "https://media.bizj.us/view/img/12093761/mdp06464*1200xx1333-1333-334-0.jpg";
                Object.assign(node.argument.children[1].children[3].openingElement.attributes[1].value, {
                    value: img,
                    raw: `"${img}"`,
                });
                element.declaration.body.body[1] = node;
                return {
                    element
                };
            }
        };
    } else {
        return {
            condition: false,
        };
    }
}
