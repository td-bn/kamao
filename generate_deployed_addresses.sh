grep -m 1 -e address deployments/kovan/*.json | sed 's/.*\/\(.*\)\.json:.*: "\(.*\)",/\1: \2/' > deployed_address.txt
