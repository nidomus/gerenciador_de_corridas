CREATE  database ifrun;


use ifrun;


CREATE TABLE corrida (

	id bigint auto_increment primary key,
	data_corrida Date not null,
	distancia double not null,
	tempo_corrida varchar(8) not null,
	ganho_elevacao double not null

);


insert into corrida values
(1, '2023-10-17', 6.75, "00:57:19", 13),
(2, '2023-10-19', 6.74, "00:57:39", 42),
(3, '2023-09-15', 6.79, "01:01:19", 12),
(4, '2023-09-16', 6.80, "00:59:20", 15);
