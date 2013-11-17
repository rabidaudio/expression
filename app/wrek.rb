require 'rubygems'
require 'nokogiri'
require 'uri'
require 'open-uri'
require 'json/pure'


#Get a list of songs played on WREK today

url = "http://www.wrek.org/playlist/"
plays = []      #a set of hashes


#date

date = nil


if ARGV.first then
    begin
        date = Date.parse(ARGV.first)
    rescue
        date = Date.today
    end
end


if (date.nil? or date < Date.today - 365*20) then
#don't bother with days more than 20 years ago
    date = Date.today
end

p date.strftime('%s')

#uri = URI.parse(url)
#params = { :timestamp => date.strftime('%s') }
#uri.query = URI.encode_www_form( params )

#page = Nokogiri::HTML ( uri.open )

##find the table with id=playlist, then for each tr tag,
##   grab each child node one at a time and store it to
##   a hash, and put that hash in the plays array

#page.css("#playlist").css("tr").each {|tr|
#    play = {time:   tr.children[0].text, 
#            title:  tr.children[1].text, 
#            artist: tr.children[2].text, 
#            album:  tr.children[3].text, 
#            format: tr.children[4].text, 
#            label:  tr.children[5].text, 
#    }
#    plays.push(play)
#}

##of course, the first one was the column headers, so we want to drop it
#plays = plays[1..-1]

##now print our array in a pretty format
##for p in plays do
##    puts "SONG:"
##    p.each {|key,value| puts "\t#{key}:\t\t#{value}"}
##end

#out = {date: date, data: plays}
#p out.to_json
