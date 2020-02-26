Scheme Definitons
=================
To keep the DB concept clean, all schemes are grouped into folders by category.
Each scheme should, apart from the defined attributes, also list all references
to and from other schemes as comments. The syntax for these attributes is:

- `in`  for incoming association
- `out` for outgoing association
- `#`   when a table is involved for lookup
- `()`  when the association is created from the other side

The order is `in`, `out`, `#`.

In case of an `in` reference the number of incoming references can be noted with
`1` for single or `n` for multiple objects.

Description of specific models
==============================
Contact
-------
| Model              | Purpose                                                 |
|--------------------|---------------------------------------------------------|
| Contact            | Person/organisation and all associated information      |
| ContactLogin       | Unique login for a contact                              |
| ContactGroup       | Set of contacts. Or groups (can be layered)             |
| ContactDepartment  | Set of contact groups                                   |

Request
-------
| Model              | Purpose                                                 |
|--------------------|---------------------------------------------------------|
| Request            | Inquiry, usually for an @Event, that needs @Resource_s  |
| RequestManager     | Person that takes care of a request                     |
| RequestManagerRole | Role a person has that is taking care of a request      |
| RequestState       | Different states of requests, e.g. approved or canceled |
| Reservation        | Start and end date for @Resource rental for a @Request  |
| ReservationList    | Mapping from @Reservation to @Resource, defines amount  |

Event
-----
| Model              | Purpose                                                 |
|--------------------|---------------------------------------------------------|
| Event              | An Event happening at one or more @EventDate_s          |
| EventDate          | Start and end date for an @Event                        |
| EventType          | Type of which an @Event can be, e.g. concert or film    |

Resource
--------
| Model              | Purpose                                                 |
|--------------------|---------------------------------------------------------|
| Resource           | One resource type, interchangable, can have instances   |
| ResourceCategory   | Set of similar resource groups (can be layered)         |
| ResourceGroup      | Set of resources that can commonly replace each other   |
| ResourceInstance   | Concrete resource instance, usually with serial number  |
| ResourcePackage    | Set of resources, commonly needed together              |
| ResourcePackageToGroup| Map amount from @ResourcePackage onto @ResourceGroup |
