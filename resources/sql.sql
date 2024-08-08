create table "nou_subpagelink" (
    "id" serial primary key,
    "imagesrc" text,
    "subpage_id" int references "nou_subpage"
);

create table "nou_contacts" (
    "id" serial primary key,
    "name" text,
    "image" text,
    "subpage_id" int references "nou_subpage"
);

create table "nou_subpage" (
    "id" serial primary key,
    "imagesrc" text,
    "title" text,
    "link" text,
    "description" text,
);

create table "nou_front" (
    "id" serial primary key,
    "subpagelinks_id" int references "nou_subpagelink"
);