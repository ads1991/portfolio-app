import { Link } from 'react-router-dom'
import { Mail, Phone, Github, MapPin } from 'lucide-react'

export default function Home() {
  const projects = [
    {
      id: 'instagram-clone',
      name: 'Photo Sharing App',
      description: 'Full-stack social media platform with React, FastAPI, AWS EC2, RDS, and S3 for media storage',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    },
    {
      id: 'swiggy-expense-tracker',
      name: 'Swiggy Expense Tracker',
      description: 'Chrome extension + React dashboard to track and analyze your Swiggy, Instamart expenses',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    },
    {
      id: 'screener-converter',
      name: 'Screener INR to USD',
      description: 'Chrome extension that converts Indian Rupee values to USD on Screener.in for stock research',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
    },
  ]

  const skills = ['React.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'Material UI', 'REST APIs', 'Python', 'Docker', 'AWS', 'Jest', 'OAuth 2.0']

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Adhishree Ranpura</h1>
          <div className="flex flex-wrap gap-3 text-sm mb-6">
            <a href="mailto:adhishree1998@gmail.com" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              adhishree1998@gmail.com
            </a>
            <a href="tel:+917021341563" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              +91 7021341563
            </a>
            <a href="https://github.com/ads1991" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
              github.com/ads1991
            </a>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Mumbai
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
