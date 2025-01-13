CREATE TABLE Label (
	label_id int GENERATED ALWAYS AS IDENTITY,
	fr varchar(5000),
	en varchar(5000),

	CONSTRAINT PK_label PRIMARY KEY (label_id)
);

CREATE TABLE Almofus_User(
	almofus_user_id int GENERATED ALWAYS AS IDENTITY,
	name varchar(50),
	email varchar(50),

	CONSTRAINT PK_almofus_user PRIMARY KEY (almofus_user_id)
);

CREATE TABLE Character (
	character_id int GENERATED ALWAYS AS IDENTITY,
	name varchar(50),
	user_id int,

	CONSTRAINT PK_character_id PRIMARY KEY (character_id)
);

CREATE TABLE Almanax_Day (
	almanax_day_id int GENERATED ALWAYS AS IDENTITY,
	almanax_quest_id int,
	character_id int,
	is_validated boolean,

	CONSTRAINT PK_almanax_day PRIMARY KEY (almanax_day_id)
);

CREATE TABLE Almanax_Quest (
	almanax_quest_id int GENERATED ALWAYS AS IDENTITY,
	name_label_id int,
	date date,
	item_id int,
	item_quantity int,
	dofus_npc_id int,
	npc_name_label_id int,
	kama_reward int,
	bonus_effect_description_label_id int,
	
	CONSTRAINT PK_almanax_quest PRIMARY KEY (almanax_quest_id)
);

CREATE TABLE Item (
	item_id int GENERATED ALWAYS AS IDENTITY,
	dofus_item_id int,
	name_label_id int,
	level int,
	
	CONSTRAINT PK_item PRIMARY KEY (item_id)
);

ALTER TABLE Character
ADD CONSTRAINT FK_Character_User foreign key (user_id) references Almofus_User (almofus_user_id);

ALTER TABLE Almanax_Day
ADD CONSTRAINT FK_Almanax_Day__Almanax_Quest foreign key (almanax_quest_id) references Almanax_Quest (almanax_quest_id);
ALTER TABLE Almanax_Day
ADD CONSTRAINT FK_Almanax_Day__Character foreign key (character_id) references Character (character_id);

ALTER TABLE Almanax_Quest
ADD CONSTRAINT FK_Almanax_Quest__Label__name foreign key (name_label_id) references Label (label_id);
ALTER TABLE Almanax_Quest
ADD CONSTRAINT FK_Almanax_Quest__Label__npc_name foreign key (npc_name_label_id) references Label (label_id);
ALTER TABLE Almanax_Quest
ADD CONSTRAINT FK_Almanax_Quest__Label__bonus foreign key (bonus_effect_description_label_id) references Label (label_id);
ALTER TABLE Almanax_Quest
ADD CONSTRAINT FK_Almanax_Quest__Item foreign key (item_id) references Item (item_id);

ALTER TABLE Item
ADD CONSTRAINT FK_Item__Label__name foreign key (name_label_id) references Label (label_id);