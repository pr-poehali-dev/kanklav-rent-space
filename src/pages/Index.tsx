import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rooms: number;
  area: number;
  image: string;
  type: 'apartment' | 'house' | 'studio';
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Деревянный дом в историческом центре',
    location: 'Ярославль, Кировский р-н',
    price: 65000,
    rooms: 3,
    area: 95,
    image: 'https://cdn.poehali.dev/projects/da95c46e-09c0-4a62-a616-234d692fb8c5/files/dcae2ed2-a8f9-42d8-9c0e-9614d3cd7b16.jpg',
    type: 'house'
  },
  {
    id: 2,
    title: 'Кирпичный коттедж с участком',
    location: 'Ярославль, Дзержинский р-н',
    price: 120000,
    rooms: 4,
    area: 180,
    image: 'https://cdn.poehali.dev/projects/da95c46e-09c0-4a62-a616-234d692fb8c5/files/86066f28-0a11-4d3d-bfee-b01ae2969d7e.jpg',
    type: 'house'
  },
  {
    id: 3,
    title: 'Дом у Волги с панорамными окнами',
    location: 'Ярославль, Красноперекопский р-н',
    price: 95000,
    rooms: 3,
    area: 140,
    image: 'https://cdn.poehali.dev/projects/da95c46e-09c0-4a62-a616-234d692fb8c5/files/80792bed-53d5-4670-89b7-34a713006b17.jpg',
    type: 'house'
  },
  {
    id: 4,
    title: 'Современный таунхаус в новом районе',
    location: 'Ярославль, Заволжский р-н',
    price: 75000,
    rooms: 3,
    area: 110,
    image: 'https://cdn.poehali.dev/projects/da95c46e-09c0-4a62-a616-234d692fb8c5/files/c46f0f6f-73d5-434d-a9dc-ded84ac53a94.jpg',
    type: 'house'
  },
  {
    id: 5,
    title: 'Уютный дом с баней и садом',
    location: 'Ярославль, Фрунзенский р-н',
    price: 55000,
    rooms: 2,
    area: 85,
    image: 'https://cdn.poehali.dev/projects/da95c46e-09c0-4a62-a616-234d692fb8c5/files/dcae2ed2-a8f9-42d8-9c0e-9614d3cd7b16.jpg',
    type: 'house'
  },
  {
    id: 6,
    title: 'Просторный дом для большой семьи',
    location: 'Ярославль, Ленинский р-н',
    price: 110000,
    rooms: 5,
    area: 220,
    image: 'https://cdn.poehali.dev/projects/da95c46e-09c0-4a62-a616-234d692fb8c5/files/86066f28-0a11-4d3d-bfee-b01ae2969d7e.jpg',
    type: 'house'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [activeSection, setActiveSection] = useState('home');

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && property.price < 50000) ||
                        (priceRange === 'medium' && property.price >= 50000 && property.price < 100000) ||
                        (priceRange === 'high' && property.price >= 100000);
    
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Home" className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Канклав</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveSection('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Главная
            </button>
            <button 
              onClick={() => setActiveSection('catalog')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Каталог
            </button>
            <button 
              onClick={() => setActiveSection('about')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              О нас
            </button>
            <button 
              onClick={() => setActiveSection('help')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'help' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Помощь
            </button>
            <button 
              onClick={() => setActiveSection('contacts')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Контакты
            </button>
          </nav>

          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="User" className="h-4 w-4" />
            Профиль
          </Button>
        </div>
      </header>

      <section className="relative py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Найдите идеальное жильё
            </h1>
            <p className="text-xl text-muted-foreground">
              Тысячи проверенных объектов для аренды в вашем городе
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-4">
              <div className="relative flex-1">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Город или район..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                <Icon name="Search" className="mr-2 h-5 w-5" />
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b bg-muted/30">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Filter" className="h-4 w-4" />
              Найдено объектов: {filteredProperties.length}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Тип жилья" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="apartment">Квартира</SelectItem>
                  <SelectItem value="studio">Студия</SelectItem>
                  <SelectItem value="house">Дом</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Цена" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любая цена</SelectItem>
                  <SelectItem value="low">До 50 000 ₽</SelectItem>
                  <SelectItem value="medium">50 000 - 100 000 ₽</SelectItem>
                  <SelectItem value="high">От 100 000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <Card 
                key={property.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-background/90 text-foreground hover:bg-background">
                    {property.type === 'apartment' ? 'Квартира' : property.type === 'studio' ? 'Студия' : 'Дом'}
                  </Badge>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="MapPin" className="h-4 w-4" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Bed" className="h-4 w-4" />
                      <span>{property.rooms} комн.</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Maximize" className="h-4 w-4" />
                      <span>{property.area} м²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                      <div className="text-2xl font-bold">{property.price.toLocaleString('ru-RU')} ₽</div>
                      <div className="text-xs text-muted-foreground">в месяц</div>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Icon name="Eye" className="h-4 w-4" />
                      Смотреть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Канклав</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Платформа для поиска и аренды недвижимости
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">О нас</button></li>
                <li><button className="hover:text-foreground transition-colors">Вакансии</button></li>
                <li><button className="hover:text-foreground transition-colors">Блог</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">Помощь</button></li>
                <li><button className="hover:text-foreground transition-colors">Контакты</button></li>
                <li><button className="hover:text-foreground transition-colors">FAQ</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  info@kanklav.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  +7 (495) 123-45-67
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 Канклав. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;