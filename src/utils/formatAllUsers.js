export default function formatAllUsers(usersSearched = []) {
  if (arrayIsEmpty(usersSearched)) return [];

  const ids = getIds(usersSearched);

  const usersWithoutKnowledges = getUserDataById(ids, usersSearched);

  const usersWithKnowledges = fillInUserKnowledge(
    usersWithoutKnowledges,
    usersSearched
  );

  return usersWithKnowledges;
}

function getUserDataById(ids, usersSearched) {
  let user = {};
  let userFound = {};

  const users = ids.map((id) => {
    userFound = usersSearched.find((userSearched) => userSearched.id === id);

    user = { ...userFound };

    delete user?.knowledge_name;
    delete user?.knowledge_score;

    return user;
  });

  return users;
}

function getIds(usersSearched) {
  let ids = new Set();

  usersSearched.forEach((userSearched) => {
    ids.add(userSearched.id);
  });

  return Array.from(ids);
}

function fillInUserKnowledge(users, usersSearched) {
  const usersWithKnowledges = users.map((user) => {
    const usersFilteredById = usersSearched.filter(
      (userSearched) => userSearched.id === user.id
    );

    const knowledges = usersFilteredById.map((userFiltered) => {
      const { knowledge_name: name, knowledge_score: score } = userFiltered;

      return {
        name,
        score,
      };
    });

    user.knowledges = knowledges;
    return user;
  });
  return usersWithKnowledges;
}

function arrayIsEmpty(array = []) {
  return array?.length <= 0;
}
