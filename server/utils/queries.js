import gql from "graphql-tag";


//savedTools is array. user needs to query tools from savedTools. then add and delete tools from savedTools array
export const QUERY_TOOLLIST = gql`
  {
    query tool{
        savedTools {
            toolName
            toolId
            }
        }
    }

`;

export const QUERY_USER = gql`
   query user($username: String!) {
     user(username: $username) {
       _id
       username
       email
       toolCount
       savedTools {
        _id
        toolId
        toolName
        createdAt
        noteCount
       }
     }
   }
 `;

export const QUERY_ME = gql`
   {
     me {
       _id
       username
       email
       toolCount
       savedTools {
         toolId
         toolName
       }
     }
   }
 `;

 export const QUERY_ME_BASIC = gql`
    {
        me {
            _id
            username
            email
            savedTools {
                toolName
            }
        }
    }
    `;

export const QUERY_TOOL = gql`
    query tool($id: ID!) {
        tool(_id: $id) {
            toolName
            toolId
            createdAt
            checkedInBy
            notes {
                _id
                createdAt
                noteBody
                username
               }
             }
           }    
         `;