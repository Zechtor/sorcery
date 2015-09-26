# drop the tables
drop table article;
drop table tweet;
drop table team;
drop table league;
drop table sport;

# reset table data
delete from sport;
insert into sport (name, createDate) values ("Basketball", CURRENT_TIMESTAMP);
select * from sport;

delete from league;
insert into league (name, sportId, createDate) values ("NBA", 1, CURRENT_TIMESTAMP);
select * from league;

delete from team;
insert into team (name, city, createDate, leagueId) values ("Magic", "Orlando", CURRENT_TIMESTAMP, 1);
select * from team;

delete from tweet;

delete from article;
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
insert into article (articleId, createDate, postDate, title, articleUrl, imageUrl) values ('123145', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Magic set to win lots of games', 'https://www.google.com/', 'http://uniformcritics.com/unis/logos/teams/orlando-magic.png');
select * from article;