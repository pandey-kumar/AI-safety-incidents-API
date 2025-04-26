# API Architecture and Workflow Diagram

## System Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│                         Client Applications                        │
│                                                                   │
└───────────────┬───────────────────────────────────┬───────────────┘
                │                                   │
                ▼                                   ▼
┌───────────────────────────┐       ┌───────────────────────────────┐
│                           │       │                               │
│     GET/DELETE Requests   │       │        POST Requests          │
│                           │       │                               │
└───────────────┬───────────┘       └───────────────┬───────────────┘
                │                                   │
                ▼                                   ▼
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│                        Express.js Server                          │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │                 │  │                 │  │                 │   │
│  │  API Routes     │──▶  Controllers    │──▶  Models         │   │
│  │                 │  │                 │  │                 │   │
│  └─────────────────┘  └─────────────────┘  └────────┬────────┘   │
│                                                     │            │
└─────────────────────────────────────────────────────┼────────────┘
                                                      │
                                                      ▼
                                           ┌────────────────────────┐
                                           │                        │
                                           │   MongoDB Database     │
                                           │                        │
                                           └────────────────────────┘
```

## Request-Response Flow

### GET /incidents

```
┌─────────┐     ┌─────────────┐     ┌──────────────────┐     ┌─────────────┐     ┌─────────┐
│         │     │             │     │                  │     │             │     │         │
│ Client  │────▶│ Express     │────▶│ incidentController│────▶│ Incident    │────▶│ MongoDB │
│         │     │ Router      │     │ getAllIncidents   │     │ Model       │     │         │
│         │◀────│             │◀────│                  │◀────│             │◀────│         │
└─────────┘     └─────────────┘     └──────────────────┘     └─────────────┘     └─────────┘
   HTTP           Route               Controller Logic          Mongoose           Database
  Request        Handling             Data Processing           Operations         Query
```

### POST /incidents

```
┌─────────┐     ┌─────────────┐     ┌──────────────────┐     ┌─────────────┐     ┌─────────┐
│         │     │             │     │                  │     │             │     │         │
│ Client  │────▶│ Express     │────▶│ incidentController│────▶│ Incident    │────▶│ MongoDB │
│         │     │ Router      │     │ createIncident   │     │ Model       │     │         │
│         │     │             │     │ - Validation     │     │             │     │         │
│         │◀────│             │◀────│ - Processing     │◀────│             │◀────│         │
└─────────┘     └─────────────┘     └──────────────────┘     └─────────────┘     └─────────┘
   HTTP           Route               Controller Logic          Mongoose           Database
  Request        Handling           Input Validation &         Create New          Insert
                                    Response Formation          Document          Operation
```

### GET /incidents/:id

```
┌─────────┐     ┌─────────────┐     ┌──────────────────┐     ┌─────────────┐     ┌─────────┐
│         │     │             │     │                  │     │             │     │         │
│ Client  │────▶│ Express     │────▶│ incidentController│────▶│ Incident    │────▶│ MongoDB │
│         │     │ Router      │     │ getIncidentById  │     │ Model       │     │         │
│         │◀────│             │◀────│                  │◀────│             │◀────│         │
└─────────┘     └─────────────┘     └──────────────────┘     └─────────────┘     └─────────┘
   HTTP           Route               Controller Logic          Mongoose           Database
  Request        Handling           Check if Incident           findById          Query by
 with ID         with Param            Exists                  Operation            ID
```

### DELETE /incidents/:id

```
┌─────────┐     ┌─────────────┐     ┌──────────────────┐     ┌─────────────┐     ┌─────────┐
│         │     │             │     │                  │     │             │     │         │
│ Client  │────▶│ Express     │────▶│ incidentController│────▶│ Incident    │────▶│ MongoDB │
│         │     │ Router      │     │ deleteIncident   │     │ Model       │     │         │
│         │◀────│             │◀────│                  │◀────│             │◀────│         │
└─────────┘     └─────────────┘     └──────────────────┘     └─────────────┘     └─────────┘
   HTTP           Route               Controller Logic          Mongoose           Database
  Request        Handling           Check if Incident           deleteOne          Remove
 with ID         with Param            Exists                  Operation          Document
```

## Data Flow Lifecycle

1. **Client Request**: The client sends an HTTP request to one of the API endpoints.
2. **Routing**: Express.js routes the request to the appropriate controller method.
3. **Controller Processing**: 
   - Validates input data (for POST requests)
   - Calls the appropriate Mongoose model methods
   - Formats the response
4. **Database Operations**: Mongoose performs CRUD operations on the MongoDB database.
5. **Response Formation**: Controller formats the data from the database into a JSON response.
6. **Client Response**: The JSON response is sent back to the client.

## Error Handling Flow

```
┌─────────┐     ┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│         │     │             │     │                  │     │             │
│ Client  │────▶│ Express     │────▶│ Try/Catch Blocks │────▶│ Error       │
│         │     │ Router      │     │ in Controllers   │     │ Middleware  │
│         │◀────│             │◀────│                  │◀────│             │
└─────────┘     └─────────────┘     └──────────────────┘     └─────────────┘
   HTTP           Route               Error Detection        Error Response
  Request        Handling                                       Formation
``` 