import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//https://api.github.com/orgs/${debouncedFilter}/public_members

interface MemberEntity {
  id: string;
  login: string;
}

export const ListEmployees: React.FC = () => {
  const [filter, setFilter] = React.useState("lemoncode");
  const [userCollection, setUserCollection] = React.useState<MemberEntity[]>(
    []
  );

  const handleFindOrganization = () => {
    fetch(`https://api.github.com/orgs/${filter}/members`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response.status);
          setUserCollection([]);
          return Promise.reject("some error happend maybe 404");
        }
      })
      .then((data) => setUserCollection(data))
      .catch((error) => console.log("error is ", error));
  };

  React.useEffect(() => {
    handleFindOrganization();
  }, []);

  return (
    <>
      <h1>Employees Organization filter.</h1>
      <div>
        <TextField
          id="outlined-basic"
          label="Organization Name"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="primary"
          onClick={handleFindOrganization}
        >
          Find
        </Button>
        <ListEmployeesComponent userCollection={userCollection} />
      </div>
    </>
  );
};

export const MessageErrorComponent: React.FC = () => {
  return <h3>Invalid name</h3>;
};

interface ListEmployeesProps {
  userCollection: MemberEntity[];
}

export const ListEmployeesComponent: React.FC<ListEmployeesProps> = ({
  userCollection,
}) => {
  if (userCollection && userCollection.length > 0) {
    return <ListEmployessSubComponent userCollection={userCollection} />;
  } else {
    return <MessageErrorComponent />;
  }
};

const ListEmployessSubComponent: React.FC<ListEmployeesProps> = ({
  userCollection,
}) => (
  <ul>
    {userCollection.map((user, index) => (
      <li key={index}>{user.login}</li>
    ))}
  </ul>
);
