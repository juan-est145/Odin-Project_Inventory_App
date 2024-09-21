SELECT games.title, genres.genre
FROM game_genre
	INNER JOIN games ON games.id=game_genre.game_id
	INNER JOIN genres ON genres.id=game_genre.genre_id; 