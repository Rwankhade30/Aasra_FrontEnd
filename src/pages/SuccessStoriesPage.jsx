import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const moreStories = [
  // --- copy your recent two (optional) so users see them here too ---
  {
    id: 1,
    category: "Dog",
    breed: "Labrador",
    description: "Found injured near the highway.",
    status: "Recovered",
    age: "2 years",
    size: "Medium",
    location: "Pune",
    img: "/assets/images/animals/gud.jpeg"
  },
  {
    id: 2,
    category: "Cat",
    breed: "Siamese",
    description: "Rescued from a construction site.",
    status: "Recovered",
    age: "1 year",
    size: "Small",
    location: "Mumbai",
    img: "/assets/images/animals/Siamese.jpeg"
  },
  // --- add as many as you like below ---
  {
    id: 3,
    category: "Dog",
    breed: "German Shepherd",
    description: "Abandoned and fearful; now in foster care.",
    status: "Fostered",
    age: "3 years",
    size: "Large",
    location: "Delhi",
    img: "/assets/images/animals/german.jpeg"
  },
  {
    id: 4,
    category: "Cat",
    breed: "Bombay",
    description: "Kitten rescued from drain; fully recovered.",
    status: "Adopted",
    age: "4 months",
    size: "Small",
    location: "Guwahati",
    img: "/assets/images/animals/sia.jpeg"
  },
  {
    id: 5,
    category: "Rabbit",
    breed: "Lop",
    description: "Heatstroke case; stabilized and thriving.",
    status: "Recovered",
    age: "1 year",
    size: "Small",
    location: "Delhi",
    img: "/assets/images/animals/rab.jpeg"  
  },
  {
    id: 6,
    category: "Rabbit",
    breed: "Indie",
    description: "Hit-and-run survivor; undergoing physio.",
    status: "Recovered",
    age: "2 years",
    size: "Medium",
    location: "Pune",
    img: "/assets/images/animals/piu.jpeg"
  },
  {
    id: 7,
    category: "Cat",
    breed: "Tabby",
    description: "Found dehydrated; responding to fluids.",
    status: "Recovered",
    age: "8 months",
    size: "Small",
    location: "Mumbai",
    img: "/assets/images/animals/tia.jpeg"
  },
  {
    id: 8,
    category: "Dog",
    breed: "Beagle",
    description: "Senior with arthritis; placed in hospice foster.",
    status: "Recovered",
    age: "10 years",
    size: "Medium",
    location: "Chennai",
    img: "/assets/images/animals/big.jpeg"
  },
  {
    id: 9,
    category: "Cow",
    breed: "Sahiwal",
    description: "Injured leg; recuperating at sanctuary.",
    status: "Recovered",
    age: "Young",
    size: "Extra-large",
    location: "Farm Sanctuary",
    img: "/assets/images/animals/Shahi.jpeg"
  },
  {
    id: 10,
    category: "Dog",
    breed: "Golden Retriever",
    description: "Surrendered; heartworm treated, now adopted.",
    status: "Adopted",
    age: "7 years",
    size: "Large",
    location: "Pune",
    img: "/assets/images/animals/goldy.jpeg"
  },

  {
    id: 11,
    category: "Horse",
    breed: "Marwari",
    description: "Stray horse with hoof injury; receiving farriery care.",
    status: "Recovered",
    age: "5 years",
    size: "Extra-large",
    location: "Jaipur",
    img: "/assets/images/animals/hunk.jpeg"
  },
  {
    id: 12,
    category: "Goat",
    breed: "Jamunapari",
    description: "Tether injury; now safe at foster farm.",
    status: "Recovered",
    age: "2 years",
    size: "Medium",
    location: "Lucknow",
    img: "/assets/images/animals/lucky.jpeg"
  },
  {
    id: 13,
    category: "Rabbit",
    breed: "Dutch",
    description: "Rescued from roadside crate; dewormed and recovering.",
    status: "Recovered",
    age: "6 months",
    size: "Small",
    location: "Bengaluru",
    img: "/assets/images/animals/dinu.jpeg"
  },
  {
    id: 14,
    category: "Horse",
    breed: "Indian",
    description: "Found with harness wounds; healing with daily dressings.",
    status: "Recovered",
    age: "4 years",
    size: "Large",
    location: "Ahmedabad",
    img: "/assets/images/animals/jack.jpeg"
  },
  {
    id: 15,
    category: "Goat",
    breed: "Chegu",
    description: "Entangled in wire; treated for minor lacerations.",
    status: "Adopted",
    age: "1.5 years",
    size: "Medium",
    location: "Udaipur",
    img: "/assets/images/animals/sinu.jpeg"
  },
  {
    id: 16,
    category: "Goat",
    breed: "Sirohi",
    description: "Abandoned; on nutritional rehab and hoof care.",
    status: "Recovered",
    age: "3 years",
    size: "Medium",
    location: "Pune",
    img: "/assets/images/animals/pony.jpeg"
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 m-0">Success Stories</h1>
          <Link to="/rescues" className="btn btn-outline-secondary">Back to Rescue</Link>
        </div>

        <Row className="g-4">
          {moreStories.map((r) => (
            <Col lg={4} md={6} key={r.id}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img
                  variant="top"
                  src={r.img}
                  alt={`${r.category} ${r.breed}`}
                  style={{ height: 220, objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="mb-2">
                    {r.category} {r.breed}
                  </Card.Title>
                  <Card.Text className="mb-2">{r.description}</Card.Text>
                  <Card.Text className="text-primary fw-semibold mb-2">{r.status}</Card.Text>
                  <Card.Text className="mb-2">
                    <small className="text-muted">{r.age} • {r.size}</small>
                  </Card.Text>
                  <span className="badge bg-success-subtle text-success">{r.location}</span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
