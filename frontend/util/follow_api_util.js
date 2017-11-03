export const getFollow = (follower_id, followable_id, followable_type = "User") => {
  return $.ajax({
    url: `api/follows?follower_id=${follower_id}&followable_id=${followable_id}&followable_type=${followable_type}`
  })
};

export const createFollow = (follower_id, followable_id, followable_type = "User") => {
  return $.ajax({
    url: `api/follows`,
    method: 'post',
    data: {
      follow: {
        follower_id,
        followable_id,
        followable_type
      }
    }
  });
};



export const deleteFollow = (follower_id, followable_id, followable_type = "User") => {
  return $.ajax({
    url: `api/follows?follower_id=${follower_id}&followable_id=${followable_id}&followable_type=${followable_type}`,
    method: 'delete'
  });
};