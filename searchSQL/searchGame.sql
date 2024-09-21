SELECT games.id, games.title, games.release_date, developers.name 
FROM games
INNER JOIN developers ON games.dev_id=developers.id;